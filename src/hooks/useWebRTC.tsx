import { useCallback, useEffect, useRef, useState } from "react";
import useVideoSocket from "./useVideoSocket";
import { toast } from "react-toastify";

const useWebRTC = () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // 1) SETUP
  // ─────────────────────────────────────────────────────────────────────────────

  // Get our pre‑configured Socket.IO namespace
  const { videoSocket } = useVideoSocket();

  // Keep a single RTCPeerConnection instance over renders
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  // Local/remote media streams in state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);



  // Store the current partner’s userId for signaling
  const partnerIdRef = useRef<string | null>(null);

  // Track whether ICE has connected
  const [usersConnected, setUsersConnected] = useState<boolean>(false); /** @note When two users connected then it should be true other-wise false */

  // ─────────────────────────────────────────────────────────────────────────────
  // 2) CAPTURE LOCAL MEDIA
  // ─────────────────────────────────────────────────────────────────────────────

  // Request camera + mic and store in state
  const setLocalStreamFunction = useCallback(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } catch {
        toast.error("Failed to access camera/mic");
      }
    })();
  }, []);

  // Run once on mount
  useEffect(() => {
    setLocalStreamFunction();
  }, [setLocalStreamFunction]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3) PEER CONNECTION MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────────

  // Create or reuse RTCPeerConnection
  const getOrCreatePeerConnection = useCallback(() => {
    // If existing and not closed, reuse
    if (
      peerConnection.current &&
      peerConnection.current.signalingState !== "closed"
    ) {
      return peerConnection.current;
    }
    // Otherwise, need local media first
    if (!localStream) return null;

    // Create new RTCPeerConnection with a public STUN server
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peerConnection.current = pc;

    // Add all local tracks (audio/video) to the connection
    localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));

    // Whenever a new ICE candidate is found, send it to the partner
    pc.onicecandidate = (e) => {
      if (e.candidate && videoSocket) {
        videoSocket.emit("ice-candidate", {
          to: partnerIdRef.current,
          candidate: e.candidate,
        });
      }
    };

    // When remote tracks arrive, show them
    pc.ontrack = (e) => setRemoteStream(e.streams[0]);

    // Watch ICE connection state (checking → connected → disconnected, etc.)
    pc.oniceconnectionstatechange = () => {
      switch (pc.iceConnectionState) {
        case "checking":
          // ICE is trying paths
          break;
        case "connected":
          setUsersConnected(true);
          break;
        case "completed":
        case "failed":
        case "disconnected":
        case "closed":
          // Lost connectivity
          setRemoteStream(null);
          break;
      }
    };

    return pc;
  }, [localStream, videoSocket]);

  // On localStream ready, initialize peer and clean up on unmount
  useEffect(() => {
    if (!localStream) return;
    cleanupPeerConnection();
    getOrCreatePeerConnection();

    return () => {
      peerConnection.current?.close();
      peerConnection.current = null;
      setRemoteStream(null);
    };
  }, [localStream, getOrCreatePeerConnection]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4) SOCKET EVENT HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  // Simple toasts for queue conditions
  const sendSelfLoop = useCallback(() => toast.info("Only you are here."), []);
  const sendWait = useCallback(() => toast.info("Waiting for partner…"), []);
  const sendNotFound = useCallback(() => toast.info("Partner not available"), []);
  const sendError = useCallback((msg: string) => toast.error(msg), []);

  /** When a match is found:
   *  - isCaller === true: create & send an SDP offer
   *  - isCaller === false: just wait for the call
   */
  const handleMatchFound = useCallback(
    async ({ partnerId, isCaller }: any) => {
      const pc = peerConnection.current;
      if (!pc || !videoSocket) return;

      if (!isCaller) {
        toast.info("Partner found — waiting for their call.");
        return;
      }

      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        videoSocket.emit("call-user", { to: partnerId, offer });
        partnerIdRef.current = partnerId;
      } catch (e) {
        console.error(e);
        sendError("Failed to create offer");
      }
    },
    [getOrCreatePeerConnection, videoSocket, sendError]
  );

  /** When an offer arrives:
   *  - set as remote description
   *  - create & send an SDP answer
   */
  const handleReceiveCall = useCallback(
    async ({ offer, from }: any) => {
      const pc = peerConnection.current;
      if (!pc || !videoSocket) return;

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        console.log("Offer applied, state:", pc.signalingState);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        videoSocket.emit("call-accepted", { to: from, answer });
        partnerIdRef.current = from;
      } catch (e) {
        console.error(e);
        sendError("Error handling incoming call");
      }
    },
    [videoSocket, sendError]
  );

  /** When an answer arrives:
   *  - set as remote description if we indeed created the offer
   */
  const handleCallAccepted = useCallback(
    async ({ answer }: any) => {
      const pc = peerConnection.current;
      if (!pc) return;

      try {
        console.log("Answer arrived, signalingState:", pc.signalingState);
        if (pc.signalingState === "have-local-offer") {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        } else {
          console.warn("Unexpected signaling state; ignoring answer");
        }
      } catch (err) {
        console.error(err);
        sendError("Error setting remote description");
      }
    },
    [sendError]
  );

  /** Add each incoming ICE candidate to our peer */
  const handleICE = useCallback(
    async ({ candidate }: any) => {
      const pc = peerConnection.current;
      if (!pc) return;

      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch {
        console.error("ICE candidate add failed");
      }
    },
    []
  );

  /** Clean up & optionally restart peer when call ends */
  const cleanupPeerConnection = useCallback(() => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    setRemoteStream(null);
  }, []);

  /** Handler for remote “end-call” event */
  const handleUserCallEnded = useCallback(
    ({ isEnder }: { isEnder: boolean }) => {
      partnerIdRef.current = null; // Clean-up the previous userId
      cleanupPeerConnection();
      // If the other party ended (isEnder=false), we can auto-start a new search
      if (!isEnder && videoSocket) {
        getOrCreatePeerConnection(); // Create new peer connection
        videoSocket.emit("start:random-video-call", {
          filters: { age: "", gender: "", country: "" },
        });
        toast.info(" call ended")
      } else {
        toast.info(" call ended from isEnder")
      }
    },
    [cleanupPeerConnection, getOrCreatePeerConnection, videoSocket]
  );

  /** Handler for retry event when both agreed to try someone else */
  const handleNextTry = useCallback(() => {
    cleanupPeerConnection();
    partnerIdRef.current = null;
    getOrCreatePeerConnection();
    videoSocket?.emit("start:random-video-call", {
      filters: { age: "", gender: "", country: "" },
    });
  }, [cleanupPeerConnection, getOrCreatePeerConnection, videoSocket]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 5) ATTACH SOCKET LISTENERS
  // ─────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!videoSocket) return;

    videoSocket.on("self-loop", sendSelfLoop);
    videoSocket.on("wait", sendWait);
    videoSocket.on("user:not-found", sendNotFound);
    videoSocket.on("match:error", (e: any) =>
      sendError(e.message || "Match error")
    );
    videoSocket.on("user:match-found", handleMatchFound);
    videoSocket.on("receive-call", handleReceiveCall);
    videoSocket.on("call-accepted", handleCallAccepted);
    videoSocket.on("ice-candidate", handleICE);
    videoSocket.on("user:call-ended", handleUserCallEnded);
    videoSocket.on("user:call-ended:try:for:other", handleNextTry);

    return () => {
      videoSocket.off("self-loop", sendSelfLoop);
      videoSocket.off("wait", sendWait);
      videoSocket.off("user:not-found", sendNotFound);
      videoSocket.off("match:error");
      videoSocket.off("user:match-found", handleMatchFound);
      videoSocket.off("receive-call", handleReceiveCall);
      videoSocket.off("call-accepted", handleCallAccepted);
      videoSocket.off("ice-candidate", handleICE);
      videoSocket.off("user:call-ended", handleUserCallEnded);
      videoSocket.off(
        "user:call-ended:try:for:other",
        handleNextTry
      );
    };
  }, [
    videoSocket,
    sendSelfLoop,
    sendWait,
    sendNotFound,
    sendError,
    handleMatchFound,
    handleReceiveCall,
    handleCallAccepted,
    handleICE,
    handleUserCallEnded,
    handleNextTry,
  ]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 6) PUBLIC API
  // ─────────────────────────────────────────────────────────────────────────────

  const endCall = useCallback(() => {
    if (videoSocket) {
      // Clean up immediately
      cleanupPeerConnection();
      const partnerId = partnerIdRef.current;
      partnerIdRef.current = null;
      videoSocket.emit("end-call", { partnerId });
    }
  }, [videoSocket]);



  const randomCall = useCallback(() => {
    if (!videoSocket) return;

    // If already in a call, ask to end and retry
    if (partnerIdRef.current) {
      cleanupPeerConnection();
      getOrCreatePeerConnection();
      const partnerId = partnerIdRef.current;
      partnerIdRef.current = null;
      videoSocket.emit(
        "go:and:tell:callee:call:ended:so:you:can:try:for:others",
        { partnerId }
      );
    } else {
      cleanupPeerConnection();
      getOrCreatePeerConnection();
      videoSocket.emit("start:random-video-call", {
        filters: { age: "", gender: "", country: "" },
      });
    }
  }, [videoSocket, getOrCreatePeerConnection]);


  // ─────────────────────────────────────────────────────────────────────────────
  // 7) return states on Video page
  // ─────────────────────────────────────────────────────────────────────────────
  return { localStream, remoteStream, randomCall, endCall, usersConnected };
};

export default useWebRTC;
