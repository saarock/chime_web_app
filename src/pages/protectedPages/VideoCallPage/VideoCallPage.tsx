
// Import all the necessary dependencies here
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import {
  LoadingComponent,
  StreamWarnComponent,
  VideoAdvanceController,
  VideoBox,
  VideoControllerPanel,
  VideoTitle,
} from "../../../components";
import "../../../styles/pages/VideoCallPage.css";
import { useAuth, useWebRTC } from "../../../hooks";
import { CallReducer } from "../../../reducers";
import { videoInitialState } from "../../../types";


/**
 * VideoCallPage
 * Main page component for random video chatting.
 * - Sets up local/remote video streams
 * - Manages call state via reducer
 * - Renders video panels and control panels
 */
export default function VideoCallPage() {
  // Retrieve WebRTC streams and call controls from custom hook
  const {
    localStream,
    remoteStream,
    randomCall,
    endCall,
    isPartnerCallEnded,
    errorMessage,
    successMessage,
    onlineUsersCount,
    isVideoSocketConnected,
    webTRCDispatch,
  } = useWebRTC();

  // Check the user is login or not from the userAuth hook
  const { isAuthenticated, user } = useAuth();

  // Refs for attaching streams to <video> elements
  const localVideoRef = useRef<HTMLVideoElement>(null!);
  const remoteVideoRef = useRef<HTMLVideoElement>(null!);

  // Combine multiple UI flags into a single state via reducer
  const [state, dispatch] = useReducer(CallReducer, videoInitialState);

  // ─────────────────────────────────────────────────────────────────────────────
  // Sync local media stream with <video> element and flag availability
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Sync remote media stream with <video> element and update call flags
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const videoElement = remoteVideoRef.current;

    if (videoElement && remoteStream) {
      // Attach the remote stream to the video element
      videoElement.srcObject = remoteStream;

      // Delay marking the call as active to ensure stream is fully loaded
      const timeoutId = setTimeout(() => {
        dispatch({ type: "SET_IN_CALL", payload: true });
        dispatch({ type: "SET_CONNECTING", payload: false });
      }, 1500);

      // Cleanup timeout if the component unmounts early
      return () => clearTimeout(timeoutId);
    } else {
      // No stream means call has ended or failed
      dispatch({ type: "SET_IN_CALL", payload: false });
    }
  }, [remoteStream]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Handle partner hang-up: show connecting state again
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPartnerCallEnded) {
      // When partner ends, transition back to searching state
      dispatch({ type: "SET_IN_CALL", payload: false });
      dispatch({ type: "SET_CONNECTING", payload: true });
    }
  }, [isPartnerCallEnded]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Clean up browser unload to prevent accidental loss of interaction
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const msg =
        "If you leave this page, your active video chat will be disconnected.";
      console.log("Page is reloading...");

      e.preventDefault();
      e.returnValue = msg;
      return e;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [endCall]);


  // ─────────────────────────────────────────────────────────────────────────────
  // Call control callbacks
  // ─────────────────────────────────────────────────────────────────────────────

  // Initiates or retries random call search
  const handleRandomCall = useCallback(() => {
    // Before starting the call first cleanup the success and errorMessages

    webTRCDispatch({ type: "RESET_ERROR_AND_SUCCESS_MESSAGE" });

    dispatch({ type: "SET_CONNECTING", payload: true });
    randomCall();
  }, [randomCall]);

  // Ends current call and resets flags
  const endRandomCall = useCallback(() => {
    endCall();
    dispatch({ type: "SET_IN_CALL", payload: false });
    dispatch({ type: "SET_CONNECTING", payload: false });
  }, [endCall]);

  // Toggle local video tracks
  const toggleVideo = useCallback(() => {
    if (localStream) {
      localStream
        .getVideoTracks()
        .forEach((t) => (t.enabled = !state.isVideoEnabled));
      dispatch({ type: "TOGGLE_VIDEO" });
    }
  }, [localStream, state.isVideoEnabled]);

  // Toggle local audio tracks
  const toggleAudio = useCallback(() => {
    if (localStream) {
      console.log("trun off audio");

      localStream
        .getAudioTracks()
        .forEach((t) => (t.enabled = !state.isAudioEnabled));
      dispatch({ type: "TOGGLE_AUDIO" });
    }
  }, [localStream, state.isAudioEnabled]);

  // Toggle browser fullscreen mode for entire page
  const toggleMaximize = useCallback(() => {
    dispatch({ type: "TOGGLE_MAXIMIZED" });
    const elem = document.documentElement;
    if (!state.isMaximized) elem.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, [state.isMaximized]);

  // Zoom controls for video panels
  const increaseZoom = useCallback(
    () => dispatch({ type: "SET_ZOOM", payload: state.zoomLevel + 0.1 }),
    [state.zoomLevel],
  );
  const decreaseZoom = useCallback(
    () => dispatch({ type: "SET_ZOOM", payload: state.zoomLevel - 0.1 }),
    [state.zoomLevel],
  );

  // Cycle between side-by-side and focus-remote layouts
  const cycleLayout = useCallback(
    () =>
      dispatch({
        type: "SET_LAYOUT",
        payload:
          state.layout === "side-by-side" ? "focus-remote" : "side-by-side",
      }),
    [state.layout],
  );

  // Fullscreen for individual video elements
  const toggleFullScreenElem = useCallback(
    (ref: React.RefObject<HTMLVideoElement>) => {
      if (!ref.current) return;
      ref.current.requestFullscreen?.();
    },
    [],
  );


  // ─────────────────────────────────────────────────────────────────────────────
  // Reset: reset function for error and success message
  // ─────────────────────────────────────────────────────────────────────────────

  const reSetErrorMessage = useCallback(() => {
    webTRCDispatch({ type: "SET_ERROR_MESSAGE", payload: null });
  }, []);



  const reSetSuccessMessage = useCallback(() => {
    webTRCDispatch({ type: "SET_SUCCESS_MESSAGE", payload: null });

  }, []);


  // ─────────────────────────────────────────────────────────────────────────────
  // Render: show placeholder while checking the user-tokens
  // ─────────────────────────────────────────────────────────────────────────────
  if (!isAuthenticated || !user) {
    return <LoadingComponent />;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Render: show placeholder until local stream is ready
  // ─────────────────────────────────────────────────────────────────────────────
  if (!localStream) {
    return (
      <StreamWarnComponent /> // Component that warn the user and make notify to open the local stream. 
    );
  }

  return (
    <div className={`chime-video-call-page ${state.isMaximized ? "maximized" : ""}`}>
      <div className="chime-video-call-container">
        <VideoTitle
          errorMessage={errorMessage}
          successMessage={successMessage}
          setErrorMessage={reSetErrorMessage}
          setSuccessMessage={reSetSuccessMessage}
          onlineUsersCount={onlineUsersCount}
          isInCall={state.isInCall}
          userId={user._id}
        />
        <div className={`chime-video-grid layout-${state.layout}`}>
          <VideoBox
            stream={localStream}
            refObject={localVideoRef}
            label="You"
            isActive={true}
            isLocalVideoEnabled={state.isVideoEnabled}
            isLocalAudioEnabled={state.isAudioEnabled}
            isConnecting={false} // Set always false because this is the localStream
            isInCall={state.isInCall}
            zoomLevel={state.zoomLevel}
            layout={state.layout}
            onFullscreen={() => toggleFullScreenElem(localVideoRef)}
          />
          <VideoBox
            isRemoteAudioEnable={state.isRemoteAudioEnable}
            isRemoteVideoEnable={state.isRemoteVideoEnable}
            stream={remoteStream}
            refObject={remoteVideoRef}
            label="Remote User"
            isActive={true}
            isLocalVideoEnabled={state.isVideoEnabled}
            isConnecting={state.isConnecting}
            isInCall={state.isInCall}
            zoomLevel={state.zoomLevel}
            layout={state.layout}
            onFullscreen={() => toggleFullScreenElem(remoteVideoRef)}
            connectedTo={successMessage ? successMessage : undefined}
          />
        </div>
        <div
          className={`chime-controls-container ${state.isMaximized ? `chime-controls-container-${state.layout}` : ""}`}
        >
          <VideoControllerPanel
            isRemoteStream={remoteStream ? true : false}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            isVideoEnabled={state.isVideoEnabled}
            isAudioEnabled={state.isAudioEnabled}
            endRandomCall={endRandomCall}
            handleRandomCall={handleRandomCall}
            isConnecting={state.isConnecting}
            isSocketIsConnected={isVideoSocketConnected}
          />

          <VideoAdvanceController
            toggleMaximize={toggleMaximize}
            isMaximized={state.isMaximized}
            increaseZoom={increaseZoom}
            decreaseZoom={decreaseZoom}
            cycleLayout={cycleLayout}
            layout={state.layout}
          />
        </div>
      </div>
    </div>
  );
}
