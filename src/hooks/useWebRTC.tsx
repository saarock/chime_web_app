// import all the necessary dependencies here
import { useCallback, useEffect, useReducer, useRef } from "react";
import useVideoSocket from "./useVideoSocket";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import useWebRTCHelper from "./useWebRTCHelper";
import { initialState, webRTCReducer } from "../reducers/useWebRTCReducer";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import useDelay from "./useDelay";
/**
 * This hooks is responsible for handle rtc peer connection sockets and send the response to the page level
 * @returns {wertc-hooks}
 */
const useWebRTC = () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // 1) SETUP
  // ─────────────────────────────────────────────────────────────────────────────

  // Keep a single RTCPeerConnection instance over renders
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  // helper hooks for webRTC
  const { partnerIdRef, pendingCandidatesRef } = useWebRTCHelper();

  const [state, webTRCDispatch] = useReducer(webRTCReducer, initialState);

  const {
    localStream,
    remoteStream,
    errorMessage,
    onlineUsersCount,
    successMessage,
    isPartnerCallEnded,
    isVideoSocketConnected,
  } = state;

  const { isAuthenticated, user } = useAuth();

  // Filter states
  const filters = useSelector((state: RootState) => state.videoFilters);

  // Setup socket connection based on local stream availability
  const { videoSocket } = useVideoSocket({
    isLocalStreamIsOn: !!localStream,
    isUserVerify: isAuthenticated,
  });

  // useDelay hook for delay
  const { delay } = useDelay();

  // ─────────────────────────────────────────────────────────────────────────────
  // 2) CAPTURE LOCAL MEDIA
  // ─────────────────────────────────────────────────────────────────────────────

  // Request camera + mic and store in state
  const setLocalStreamFunction = useCallback(() => {
    (async () => {
      try {
        // alert(videoSocket?.connected)
        // if (!videoSocket || !videoSocket.connected) return;

        // Request user media (camera + mic)
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Store in state (e.g., React state or context)
        // setLocalStream(stream);
        webTRCDispatch({ type: "SET_LOCAL_STREAM", payload: stream });
      } catch (error) {
        // Display error to the user
        toast.error("Failed to access camera/mic");

        // Optionally log error for debugging
        console.error("Error accessing media devices:", error);
      }
    })();
  }, []);

  // Run once on mount
  useEffect(() => {
    // Ensure prerequisites are met
    if (!user) return; // don’t run until “user” is truthy
    setLocalStreamFunction();
    return () => {
      // Turn off all tracks if they exist
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [setLocalStreamFunction, user]);

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
      webTRCDispatch({ type: "SET_REMOTE_STREAM", payload: e.streams[0] });
    };

    // Watch ICE connection state (checking → connected → disconnected, etc.)
    pc.oniceconnectionstatechange = () => {
      switch (pc.iceConnectionState) {
        case "checking":
          // ICE is trying paths
          break;
        case "connected":
          // It means the partner end the call so try for the next. It is need to show the searching UI
          webTRCDispatch({ type: "SET_PARTNER_CALL_ENDED", payload: false });
          break;
        case "completed":
        case "failed":
        case "disconnected":
        case "closed":
          webTRCDispatch({ type: "SET_REMOTE_STREAM", payload: null });
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
      webTRCDispatch({ type: "SET_REMOTE_STREAM", payload: null });
    };
  }, [localStream, getOrCreatePeerConnection]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4) SOCKET EVENT HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  // Simple Error messages and success message handlers
  const sendSelfLoop = useCallback(
    ({ message }: { message: string }) =>
      webTRCDispatch({ type: "SET_ERROR_MESSAGE", payload: message }),
    []
  );
  const sendWait = useCallback(
    () =>
      webTRCDispatch({
        type: "SET_SUCCESS_MESSAGE",
        payload: "Wait for the partner..",
      }),
    []
  );
  const sendNotFound = useCallback(
    ({ message }: { message: string }) =>
      webTRCDispatch({ type: "SET_ERROR_MESSAGE", payload: message }),
    []
  );
  const sendError = useCallback(
    (message: string) =>
      webTRCDispatch({ type: "SET_ERROR_MESSAGE", payload: message }),
    []
  );

  /** When a match is found:
   *  - isCaller === true: create & send an SDP offer
   *  - isCaller === false: just wait for the call
   */
  const handleMatchFound = useCallback(
    async ({ partnerId, isCaller }: any) => {
      const pc = peerConnection.current;
      if (!pc || !videoSocket) return;

      if (!isCaller) {
        webTRCDispatch({
          type: "SET_SUCCESS_MESSAGE",
          payload: "partner Found..",
        });
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

      //  Only handle the call if we did NOT initiate it
      // Skip if we were the caller who sent the offer
      if (pc.signalingState !== "stable") {
        console.warn("Already initiated offer, skipping receive-call");
        return;
      }

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));

        // FLUSH any queued ICE candidates now that remoteDescription is set:
        for (const candicate of pendingCandidatesRef.current) {
          await pc.addIceCandidate(new RTCIceCandidate(candicate));
        }
        pendingCandidatesRef.current = [];

        const answer = await pc.createAnswer();

        await pc.setLocalDescription(new RTCSessionDescription(answer));
        videoSocket.emit("call-accepted", { to: from, answer });
        partnerIdRef.current = from;
      } catch (e) {
        console.error("Error in receiving call: ", e);
        sendError(
          "Error while handling incoming call. Refresh your page and try again."
        );
      }
    },
    [videoSocket, sendError]
  );

  /** When an answer arrives:
   *  Set as remote description if we indeed created the offer
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

        for (const candidate of pendingCandidatesRef.current) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (err) {
        console.error(err);
        sendError(
          "Error while accepting the call try to refresh the page and try again."
        );
      }
    },
    [sendError]
  );

  /** Add each incoming ICE candidate to our peer */
  const handleICE = useCallback(async ({ candidate }: any) => {
    const pc = peerConnection.current;
    if (!pc) return;

    // If remoteDescription is not set yet, queue this candidate:
    if (!pc.remoteDescription) {
      pendingCandidatesRef.current.push(candidate);
      return;
    }

    // Otherwise, add it
    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("ICE candidate add failed:", err);
      sendError(
        "Failed to show the root to the user or provide root to the user. Refresh your page and try again."
      );
    }
  }, []);

  /** Clean up & optionally restart peer when call ends */
  const cleanupPeerConnection = useCallback(() => {
    try {
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
      webTRCDispatch({ type: "SET_REMOTE_STREAM", payload: null });
    } catch (error) {
      console.error("Failed to cleanup the connection: ", error);
      sendError(
        "Failed to close the peer connection if something wrong refresh your page and try again if the call is working then nothing to worrie."
      );
    }
  }, [sendError]);

  /** Handler for remote “end-call” event */
  const handleUserCallEnded = useCallback(
    ({ isEnder }: { isEnder: boolean }) => {
      try {
        cleanupPeerConnection();
        webTRCDispatch({
          type: "SET_REMOTE_STREAM_NULL_AND_UPDATE_SUCCESS_MESSAGE",
          payload: "Call end",
        });
        // If the other party ended (isEnder=false), we can auto-start a new search
        if (!isEnder && videoSocket) {
          webTRCDispatch({ type: "SET_PARTNER_CALL_ENDED", payload: true });
          getOrCreatePeerConnection(); // Create new peer connection
          if (partnerIdRef.current) {
            videoSocket.emit("start:random-video-call", {
              userDetails: {
                // Use filters.age if defined and not "any";
                // else fallback to user.age if defined;
                // else fallback to "any" as string (or empty string)
                age:
                  filters.age && filters.age !== "any"
                    ? filters.age
                    : (user?.age ?? "any"),

                // Use filters.gender if defined and not empty string or "any";
                // else fallback to user.gender if defined;
                // else fallback to empty string
                gender:
                  filters.gender && filters.gender !== "any"
                    ? filters.gender
                    : (user?.gender ?? ""),

                // Use filters.country if defined and not empty string or "any";
                // else fallback to user.country if defined;
                // else fallback to empty string
                country:
                  filters.country && filters.country !== "any"
                    ? filters.country
                    : (user?.country ?? ""),
              },
            });
          }
        }
        {
          webTRCDispatch({
            type: "SET_SUCCESS_MESSAGE",
            payload: "You end the call.",
          });
        }
        partnerIdRef.current = null; // Clean-up the previous userId after all the events
      } catch (error) {
        console.error(error);
        sendError("Failed to end the call try again or refresh the page.");
      }
    },
    [
      cleanupPeerConnection,
      getOrCreatePeerConnection,
      videoSocket,
      user,
      sendError,
      filters,
    ]
  );

  /** Handler for retry event when both agreed to try someone else */
  const handleNextTry = useCallback(
    async ({ isEnder }: { isEnder: boolean }) => {
      try {
        if (!videoSocket || !user || !user._id) return;

        cleanupPeerConnection();
        if (!isEnder && partnerIdRef.current) {
          // IF not ender
          partnerIdRef.current = null; // Clean-up the previous userId only for the not ender because the one who end the call there partnerId will get immediately removed when he/do next random call
          getOrCreatePeerConnection();
          webTRCDispatch({ type: "SET_PARTNER_CALL_ENDED", payload: true }); // partner ended the call automatically try for others so show the connecting screen with the helps of this state
        }

        // Delay who end the call to prevent from the race condition
        isEnder && (await delay(200));

        getOrCreatePeerConnection(); // get New peer connection
        videoSocket?.emit("start:random-video-call", {
          userDetails: {
            // Use filters.age if defined and not "any";
            // else fallback to user.age if defined;
            // else fallback to "any" as string (or empty string)
            age:
              filters.age && filters.age !== "any"
                ? filters.age
                : (user?.age ?? "any"),

            // Use filters.gender if defined and not empty string or "any";
            // else fallback to user.gender if defined;
            // else fallback to empty string
            gender:
              filters.gender && filters.gender !== "any"
                ? filters.gender
                : (user?.gender ?? ""),

            // Use filters.country if defined and not empty string or "any";
            // else fallback to user.country if defined;
            // else fallback to empty string
            country:
              filters.country && filters.country !== "any"
                ? filters.country
                : (user?.country ?? ""),
          },
        });
      } catch (error) {
        console.error(error);
        sendError("Failed while trying for next call.");
      }
    },
    [
      cleanupPeerConnection,
      getOrCreatePeerConnection,
      videoSocket,
      user,
      sendError,
      filters,
    ]
  );

  /**
   * Handle online user counts
   */
  const handleOnlineUsersCount = useCallback(
    ({ count }: { count: number }) => {
      webTRCDispatch({ type: "SET_ONLINE_USERS_COUNT", payload: count });
    },
    [videoSocket]
  );

  /**
   * Handle global error
   */
  const handleGlobalError = useCallback(
    ({ message }: { message: string }) => {
      // If the unexpected behaviour happens then immediately disconnected the socket and cleanup all the connection
      cleanupPeerConnection();
      webTRCDispatch({
        type: "UPDATE_VIDEO_CONNECTED_ERROR_MESSAGE_AND_ONLINE_USER",
        payload: {
          isVideoSocketConnected: false,
          errorMessage: message,
          onlineUsersCount: 0,
        },
      });
      partnerIdRef.current = null;
      //Trun off the video and audio
      localStream?.getTracks().forEach((track) => {
        track.stop();
      });
    },
    [localStream]
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // 5) ATTACH SOCKET LISTENERS
  // ─────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!videoSocket) return;
    webTRCDispatch({ type: "SET_VIDEO_SOCKET_CONNECTED", payload: true });
    videoSocket.emit("onlineUsersCount");

    return () => {
      videoSocket.off("onlineUsersCount");
    };
  }, [videoSocket]);

  /**
   * Handle global succcess Message
   */

  const handleGlobalSuccessMessage = useCallback(
    ({ message }: { message: string }) => {
      webTRCDispatch({ type: "SET_SUCCESS_MESSAGE", payload: message });
    },
    []
  );

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
    videoSocket.on("duplicate:connection", handleGlobalError);
    videoSocket.on("global:success:message", handleGlobalSuccessMessage);
    videoSocket.on("call-error", handleGlobalError);

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
      videoSocket.off("video:global:error", handleGlobalError);
      videoSocket.off("duplicate:connection", handleGlobalError);
      videoSocket.off("global:success:message", handleGlobalSuccessMessage);
      videoSocket.off("call-error", handleGlobalError);
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
    handleOnlineUsersCount,
    handleGlobalError,
    handleGlobalSuccessMessage,
    handleGlobalError,
  ]);

  /**
   * This hook is only responsible for getting the online users only from the server throught the socket
   */
  useEffect(() => {
    if (!videoSocket) return;
    videoSocket.on("onlineUsersCount", handleOnlineUsersCount);

    // Cleanup
    return () => {
      videoSocket.off("onlineUsersCount", handleOnlineUsersCount);
    };
  }, [videoSocket, localStream]);

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
    if (!videoSocket) {
      toast.error("no socket when call");
      return;
    }

    webTRCDispatch({
      type: "SET_SUCCESS_MESSAGE",
      payload: "Searching partner...",
    });

    // If already in a call, ask to end and retry
    if (partnerIdRef.current && remoteStream) {
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
      // alert("I am starting the random call")
      videoSocket.emit("start:random-video-call", {
        userDetails: {
          // Use filters.age if defined and not "any";
          // else fallback to user.age if defined;
          // else fallback to "any" as string (or empty string)
          age:
            filters.age && filters.age !== "any"
              ? filters.age
              : (user?.age ?? "any"),

          // Use filters.gender if defined and not empty string or "any";
          // else fallback to user.gender if defined;
          // else fallback to empty string
          gender:
            filters.gender && filters.gender !== "any"
              ? filters.gender
              : (user?.gender ?? ""),

          // Use filters.country if defined and not empty string or "any";
          // else fallback to user.country if defined;
          // else fallback to empty string
          country:
            filters.country && filters.country !== "any"
              ? filters.country
              : (user?.country ?? ""),
        },
      });
    }
  }, [videoSocket, getOrCreatePeerConnection, remoteStream, user, filters]);

  // ─────────────────────────────────────────────────────────────────────────────
  // 7) return states on Video page
  // ─────────────────────────────────────────────────────────────────────────────
  return {
    localStream,
    remoteStream,
    randomCall,
    endCall,
    isPartnerCallEnded,
    errorMessage,
    successMessage,
    webTRCDispatch,
    onlineUsersCount,
    isVideoSocketConnected,
    videoSocket,
    partnerId: partnerIdRef.current,
  };
};

export default useWebRTC;
