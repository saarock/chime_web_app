import { useCallback, useEffect, useRef, useState } from "react";
import useVideoSocket from "./useVideoSocket";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useSelector } from "react-redux";
import { UserReduxRootState } from "../types";

const useWebRTC = () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // 1) SETUP
  // ─────────────────────────────────────────────────────────────────────────────

  // Keep a single RTCPeerConnection instance over renders
  const peerConnection = useRef<RTCPeerConnection | null>(null);



  // Local/remote media streams in state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const { isAuthenticated, user } = useAuth();


  // Setup socket connection based on local stream availability
  const { videoSocket } = useVideoSocket({ isLocalStreamIsOn: !!localStream, isUserVerify: isAuthenticated });


  // Errors in state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Online users counts
  const [onlineUsersCount, setOnlineUsersCount] = useState<number>(0);

  // SuccessMessage in state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isPartnerCallEnded, setIsPartnerCallEnded] = useState(false);

  // Store the current partner’s userId for signaling
  const partnerIdRef = useRef<string | null>(null);

  const [isVideoSocketConnected, setIsVideoSocketConnected] = useState<boolean>(false);


  const userVideoFilter = useSelector((state: UserReduxRootState) => state.videoFilters);






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
    return () => {
      // Turn off all tracks if they exist
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
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
    pc.ontrack = (e) => {
      setRemoteStream(e.streams[0])
      setSuccessMessage(` Connected to new user...`)
    };

    // Watch ICE connection state (checking → connected → disconnected, etc.)
    pc.oniceconnectionstatechange = () => {
      switch (pc.iceConnectionState) {
        case "checking":
          // ICE is trying paths
          break;
        case "connected":
          setIsPartnerCallEnded(false); // It means the partner is connected
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

  // Simple Error messages and success message handlers
  const sendSelfLoop = useCallback(({ message }: { message: string }) => setErrorMessage(message), []);
  const sendWait = useCallback(() => setSuccessMessage("Wait for the user..."), []);
  const sendNotFound = useCallback(
    ({ message }: { message: string }) => setErrorMessage(message),
    [],
  );
  const sendError = useCallback((message: string) => setErrorMessage(message), []);



  /** When a match is found:
   *  - isCaller === true: create & send an SDP offer
   *  - isCaller === false: just wait for the call
   */
  const handleMatchFound = useCallback(
    async ({ partnerId, isCaller }: any) => {
      const pc = peerConnection.current;
      if (!pc || !videoSocket) return;

      if (!isCaller) {
        setSuccessMessage("partner Found Wait for there call");
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
    [getOrCreatePeerConnection, videoSocket, sendError],
  );

  /** When an offer arrives:
   *  - set as remote description
   *  - create & send an SDP answer
   */
  const handleReceiveCall = useCallback(
    async ({ offer, from }: any) => {
      const pc = peerConnection.current;
      if (!pc || !videoSocket) return;

      //  Only handle the call if we did NOT initiate it
      // Skip if we were the caller who sent the offer
      if (pc.signalingState !== "stable") {
        console.warn("Already initiated offer, skipping receive-call");
        return;
      }

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        videoSocket.emit("call-accepted", { to: from, answer });
        partnerIdRef.current = from;
      } catch (e) {
        console.error(e);
        sendError("Error while handling incoming call. Refresh your page and try again.");
      }
    },
    [videoSocket, sendError],
  );

  /** When an answer arrives:
   *  - set as remote description if we indeed created the offer
   */
  const handleCallAccepted = useCallback(
    async ({ answer }: any) => {
      const pc = peerConnection.current;
      if (!pc) return;

      try {
        if (pc.signalingState === "have-local-offer") {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        } else {
          console.warn("Unexpected signaling state; ignoring answer");
        }
      } catch (err) {
        console.error(err);
        sendError("Error while accepting the call try to refresh the page and try again.");
      }
    },
    [sendError],
  );


  /** Add each incoming ICE candidate to our peer */
  const handleICE = useCallback(async ({ candidate }: any) => {
    const pc = peerConnection.current;
    if (!pc) return;

    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("ICE candidate add failed:", err);
      sendError("Failed to show the root to the user or provide root to the user. But no matter, happens some time so enjoy.")
    }
  }, []);

  /** Clean up & optionally restart peer when call ends */
  const cleanupPeerConnection = useCallback(() => {
    try {
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
      setRemoteStream(null);
    } catch (error) {
      console.error("Failed to cleanup the connection: ", error);
      sendError("Failed to close the peer connection if something wrong refresh your page and try again if the call is working then nothing to worrie.")
    }
  }, [sendError]);

  /** Handler for remote “end-call” event */
  const handleUserCallEnded = useCallback(
    ({ isEnder }: { isEnder: boolean }) => {
      try {
        cleanupPeerConnection();
        setRemoteStream(null);
        setSuccessMessage("Call end");
        // If the other party ended (isEnder=false), we can auto-start a new search
        if (!isEnder && videoSocket) {
          setIsPartnerCallEnded(true);
          getOrCreatePeerConnection(); // Create new peer connection
          if (partnerIdRef.current) {
            videoSocket.emit("start:random-video-call", {
              filters: { age: userVideoFilter.age, gender: userVideoFilter.gender, country: userVideoFilter.country, isStrict: userVideoFilter.isStrict },
              userDetails: { age: user?.age || "", gender: user?.gender || "", country: user?.country || "" },
            });
          }
        } else {
          toast.info(" call ended from isEnder");
        }

        partnerIdRef.current = null; // Clean-up the previous userId after all the events
      } catch (error) {
        console.error(error);
        sendError("Failed to end the call try again or refresh the page.")
      }
    },
    [cleanupPeerConnection, getOrCreatePeerConnection, videoSocket, user, userVideoFilter, sendError],
  );

  /** Handler for retry event when both agreed to try someone else */
  const handleNextTry = useCallback(
    ({ isEnder }: { isEnder: boolean }) => {
      try {
        cleanupPeerConnection();
        if (!isEnder && partnerIdRef.current) {
          setIsPartnerCallEnded(true); // partner ended the call automatically try for others so show the connecting screen with the helps of this state
        }
        partnerIdRef.current = null; // Clean-up the previous userId
        getOrCreatePeerConnection();

        videoSocket?.emit("start:random-video-call", {
          filters: { age: userVideoFilter.age, gender: userVideoFilter.gender, country: userVideoFilter.country, isStrict: userVideoFilter.isStrict },
          userDetails: { age: user?.age || "", gender: user?.gender || "", country: user?.country || "" },
        });
      } catch (error) {
        console.error(error);
        sendError("Failed while trying for next call.")
      }
    },
    [cleanupPeerConnection, getOrCreatePeerConnection, videoSocket, user, userVideoFilter, sendError],
  );


  /**
   * Handle online user counts
   */
  const handleOnlineUsersCount = useCallback(({ count }: { count: number }) => {
    setOnlineUsersCount(count);
  }, [videoSocket]);


  /**
   * Handle global error
   */
  const handleGlobalError = useCallback(({ message }: { message: string }) => {
    // If the unexpected behaviour happens then immediately disconnected the socket and cleanup all the connection
    setIsVideoSocketConnected(false);
    setErrorMessage(message);
    cleanupPeerConnection();
    partnerIdRef.current = null;
    setOnlineUsersCount(0);
  }, []);


  /**
   * Handle the case  where choosen user is busy
   */

  const handleMatchBusy = useCallback(() => {
    if (!videoSocket || !user) return;
    setTimeout(() => {
      videoSocket.emit("start:random-video-call", {
        filters: { age: userVideoFilter.age, gender: userVideoFilter.gender, country: userVideoFilter.country, isStrict: userVideoFilter.isStrict },
        userDetails: { age: user?.age || "", gender: user?.gender || "", country: user?.country || "" },
      });
    }, 1000); // retry after 1 sec 

  }, [videoSocket, userVideoFilter, user]);


  // ─────────────────────────────────────────────────────────────────────────────
  // 5) ATTACH SOCKET LISTENERS
  // ─────────────────────────────────────────────────────────────────────────────


  useEffect(() => {
    if (!videoSocket) return;
    setIsVideoSocketConnected(true); // set the videoSocket connected true
    videoSocket.emit("onlineUsersCount");


    return () => {
      videoSocket.off("onlineUsersCount");
    }

  }, [videoSocket]);


  useEffect(() => {
    if (!videoSocket) return;

    videoSocket.on("self-loop", sendSelfLoop);
    videoSocket.on("wait", sendWait);
    videoSocket.on("user:not-found", sendNotFound);
    videoSocket.on("video:global:error", handleGlobalError);
    videoSocket.on("user:match-found", handleMatchFound);
    videoSocket.on("receive-call", handleReceiveCall);
    videoSocket.on("call-accepted", handleCallAccepted);
    videoSocket.on("ice-candidate", handleICE);
    videoSocket.on("user:call-ended", handleUserCallEnded);
    videoSocket.on("user:call-ended:try:for:other", handleNextTry);
    videoSocket.on("onlineUsersCount", handleOnlineUsersCount);
    videoSocket.on("duplicate:connection", handleGlobalError);
    videoSocket.on("match-busy", handleMatchBusy);

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
      videoSocket.off("user:call-ended:try:for:other", handleNextTry);
      videoSocket.off("onlineUsersCount", handleOnlineUsersCount);
      videoSocket.off("video:global:error", handleGlobalError);
      videoSocket.off("duplicate:connection", handleGlobalError);
      videoSocket.off("match-busy", handleMatchBusy);

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
      videoSocket.emit("end-call", { partnerId });
    }
  }, [videoSocket]);

  const randomCall = useCallback(() => {
    if (!videoSocket) return;

    // If already in a call, ask to end and retry
    if (partnerIdRef.current && remoteStream) {
      cleanupPeerConnection();
      getOrCreatePeerConnection();
      const partnerId = partnerIdRef.current;
      videoSocket.emit(
        "go:and:tell:callee:call:ended:so:you:can:try:for:others",
        { partnerId },
      );
    } else {
      cleanupPeerConnection();
      getOrCreatePeerConnection();
      // alert("I am starting the random call")
      videoSocket.emit("start:random-video-call", {
        filters: { age: userVideoFilter.age, gender: userVideoFilter.gender, country: userVideoFilter.country, isStrict: userVideoFilter.isStrict },
        userDetails: { age: user?.age || "", gender: user?.gender || "", country: user?.country || "" },
      });
    }
  }, [videoSocket, getOrCreatePeerConnection, remoteStream, user, userVideoFilter]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 7) return states on Video page
  // ─────────────────────────────────────────────────────────────────────────────
  return {
    localStream,
    remoteStream,
    randomCall,
    endCall,
    isPartnerCallEnded,
    partnerIdRef,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    onlineUsersCount,
    isVideoSocketConnected,
  };
};

export default useWebRTC;
