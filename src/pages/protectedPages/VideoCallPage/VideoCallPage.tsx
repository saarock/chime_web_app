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
import { useAuth, useNotificationSounds, useWebRTC } from "../../../hooks";
import { CallReducer } from "../../../reducers";
import { videoInitialState } from "../../../types";
import useSetting from "../../../hooks/useSetting";

/**
 * VideoCallPage Component
 *
 * The main UI and logic controller for random video chat.
 * Responsibilities:
 * - Manage video/audio streams using WebRTC
 * - Handle UI states using a reducer
 * - React to lifecycle events (partner disconnect, stream readiness, etc.)
 * - Provide responsive control over video, audio, zoom, and layout
 */
export default function VideoCallPage() {
  // Custom WebRTC hook: Handles media streams, socket events, dispatching, etc.
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
    videoSocket,
    partnerId,
  } = useWebRTC();

  // Authentication state hook
  const { isAuthenticated, user } = useAuth();

  // Refs for attaching media streams to <video> elements
  const localVideoRef = useRef<HTMLVideoElement>(null!);
  const remoteVideoRef = useRef<HTMLVideoElement>(null!);

  // Notification sounds hook
  const { playError, resetSounds } = useNotificationSounds();

  // Timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // UI state management for call behavior, layout, toggles
  const [state, dispatch] = useReducer(CallReducer, videoInitialState);

  const {
    isAudioEnabled,
    isConnecting,
    isInCall,
    isMaximized,
    isRemoteAudioEnable,
    isRemoteVideoEnable,
    isVideoEnabled,
    layout,
    zoomLevel,
  } = state;

  // Setting hook
  const { hideNav, showNav, hideChimeFooter, showChimeFooter } = useSetting();

  // ─────────────────────────────────────────────────────────────────────────────
  // Media Stream Effects
  // ─────────────────────────────────────────────────────────────────────────────

  // Attach local stream to local <video> element
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Attach remote stream to remote <video> element and update call status
  useEffect(() => {
    const videoElement = remoteVideoRef.current;

    if (videoElement && remoteStream) {
      videoElement.srcObject = remoteStream;
      const timeoutId = setTimeout(() => {
        dispatch({ type: "SET_IN_CALL", payload: true });
        dispatch({ type: "SET_CONNECTING", payload: false });
        resetSounds(); // Stop the both success and error sounds
      }, 10);

      return () => clearTimeout(timeoutId);
    } else {
      dispatch({ type: "SET_IN_CALL", payload: false });
    }
  }, [remoteStream]);

  // Handle when remote partner ends the call
  useEffect(() => {
    if (isPartnerCallEnded) {
      dispatch({ type: "SET_IN_CALL", payload: false });
      dispatch({ type: "SET_CONNECTING", payload: true });
    }
  }, [isPartnerCallEnded]);

  // Warn user before leaving page during active call
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const msg =
        "If you leave this page, your active video chat will be disconnected.";
      e.preventDefault();
      e.returnValue = msg;
      return e;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [endCall]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Automatically end the "searching for random partner" state after 10 seconds
  // If no new user is found and call hasn't started, end the call and suggest retry
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Only start timer if currently connecting and NOT in a call yet
    if (isConnecting && !isInCall) {
      // Start 10-second timeout to auto-end call/search
      timerRef.current = setTimeout(() => {
        endRandomCall(); // End the call/search after timeout
        setSuccessMessage(
          "Pleased try again call ended automatically in 6 second if no partner found"
        );
      }, 6000);
    }

    // Cleanup: Clear timeout if component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isInCall, isConnecting, endCall]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Sound's handler
  // ─────────────────────────────────────────────────────────────────────────────
  const soundHandler = useCallback(
    (isErrorMessage: boolean) => {
      if (isErrorMessage) {
        playError();
      } else {
        // playSuccess();
      }
    },
    [errorMessage, successMessage]
  );

  useEffect(() => {
    if (errorMessage && errorMessage.trim() != "") {
      soundHandler(true); // Error sound
    } else if (successMessage && successMessage.trim() != "") {
      soundHandler(false); // Success sound
    }
  }, [errorMessage, successMessage]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Control Handlers
  // ─────────────────────────────────────────────────────────────────────────────

  // Start or retry a random call
  const handleRandomCall = useCallback(() => {
    webTRCDispatch({ type: "RESET_ERROR_AND_SUCCESS_MESSAGE" });
    dispatch({ type: "SET_CONNECTING", payload: true });
    randomCall();
  }, [randomCall]);

  // End an ongoing call
  const endRandomCall = useCallback(() => {
    endCall();
    dispatch({ type: "SET_IN_CALL", payload: false });
    dispatch({ type: "SET_CONNECTING", payload: false });
    reSetSuccessMessage(); // Reset the success message
    reSetErrorMessage(); // Reset the error message
  }, [endCall]);

  // Toggle local video track
  const toggleVideo = useCallback(() => {
    if (localStream) {
      localStream
        .getVideoTracks()
        .forEach((t) => (t.enabled = !isVideoEnabled));
      dispatch({ type: "TOGGLE_VIDEO" });
    }
  }, [localStream, isVideoEnabled]);

  // Toggle local audio track
  const toggleAudio = useCallback(() => {
    if (localStream) {
      localStream
        .getAudioTracks()
        .forEach((t) => (t.enabled = !isAudioEnabled));
      dispatch({ type: "TOGGLE_AUDIO" });
    }
  }, [localStream, isAudioEnabled]);

  // Toggle fullscreen for entire page
  const toggleMaximize = useCallback(() => {
    if (isMaximized) {
      showNav();
      showChimeFooter();
    } else {
      hideNav();
      hideChimeFooter();
    }
    dispatch({ type: "TOGGLE_MAXIMIZED" });
    const elem = document.documentElement;
    if (!isMaximized) elem.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, [isMaximized]);

  // Zoom controls
  const increaseZoom = useCallback(
    () => dispatch({ type: "SET_ZOOM", payload: zoomLevel + 0.1 }),
    [zoomLevel]
  );
  const decreaseZoom = useCallback(
    () => dispatch({ type: "SET_ZOOM", payload: zoomLevel - 0.1 }),
    [zoomLevel]
  );

  // Toggle layout between different view styles
  const cycleLayout = useCallback(
    () =>
      dispatch({
        type: "SET_LAYOUT",
        payload: layout === "side-by-side" ? "focus-remote" : "side-by-side",
      }),
    [layout]
  );

  // Fullscreen a specific video element
  const toggleFullScreenElem = useCallback(
    (ref: React.RefObject<HTMLVideoElement>) => {
      if (!ref.current) return;
      ref.current.requestFullscreen?.();
    },
    []
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // Message Set and Reset Handlers
  // ─────────────────────────────────────────────────────────────────────────────

  const reSetErrorMessage = useCallback(() => {
    webTRCDispatch({ type: "SET_ERROR_MESSAGE", payload: null });
  }, []);

  const reSetSuccessMessage = useCallback(() => {
    webTRCDispatch({ type: "SET_SUCCESS_MESSAGE", payload: null });
  }, []);

  const setSuccessMessage = useCallback((message: string) => {
    webTRCDispatch({ type: "SET_SUCCESS_MESSAGE", payload: message });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // Render Logic
  // ─────────────────────────────────────────────────────────────────────────────

  // Block page rendering if user is not authenticated
  if (!isAuthenticated || !user) {
    return <LoadingComponent />;
  }

  // Warn user if local stream is not available
  if (!localStream) {
    return <StreamWarnComponent />;
  }

  return (
    <div className={`chime-video-call-page ${isMaximized ? "maximized" : ""}`}>
      <div className="chime-video-call-container">
        {/* Top panel showing status and user info */}
        <VideoTitle
          errorMessage={errorMessage}
          successMessage={successMessage}
          setErrorMessage={reSetErrorMessage}
          setSuccessMessage={reSetSuccessMessage}
          onlineUsersCount={onlineUsersCount}
          isInCall={isInCall}
          userId={user?._id!}
          partnerId={partnerId}
        />

        {/* Main video grid: Local + Remote */}
        <div className={`chime-video-grid layout-${layout}`}>
          {/* Local Video Stream Box */}
          <VideoBox
            stream={localStream} // Local user's MediaStream
            refObject={localVideoRef} // Ref to bind to video element
            label="You" // Label to show on the video
            isActive={true} // Always active for local
            isLocalVideoEnabled={isVideoEnabled} // Show/hide video track icon
            isLocalAudioEnabled={isAudioEnabled} // Show/hide audio track icon
            isConnecting={false} // Local is never "connecting"
            isInCall={isInCall} // Flag: is in active call
            zoomLevel={zoomLevel} // Zoom level for display
            layout={layout} // Layout type
            onFullscreen={() => toggleFullScreenElem(localVideoRef)} // Toggle fullscreen
          />

          {/* Remote Video Stream Box */}
          <VideoBox
            stream={remoteStream} // Remote peer's MediaStream
            refObject={remoteVideoRef} // Ref for remote video element
            label="Remote User" // Display label
            isActive={true} // If stream is live
            isRemoteAudioEnable={isRemoteAudioEnable} // Audio status from remote
            isRemoteVideoEnable={isRemoteVideoEnable} // Video status from remote
            isLocalVideoEnabled={isVideoEnabled} // For video layout symmetry
            isConnecting={isConnecting} // If still connecting to remote
            isInCall={isInCall} // If call is active
            zoomLevel={zoomLevel} // Zoom level for remote
            layout={layout} // Layout styling
            onFullscreen={() => toggleFullScreenElem(remoteVideoRef)} // Toggle fullscreen
            connectedTo={successMessage ?? undefined} // Optional: Show connected user
          />
        </div>

        {/* Control panels */}
        <div
          className={`chime-controls-container ${
            isMaximized ? `chime-controls-container-${layout}` : ""
          }`}
        >
          {/* Primary Controls: Mic, Camera, Call, Retry */}
          <VideoControllerPanel
            isRemoteStream={!!remoteStream} // Only show if remote exists
            isInCall={isInCall} // True when user is in the call other-wise false
            toggleAudio={toggleAudio} // Toggle local mic
            toggleVideo={toggleVideo} // Toggle local camera
            isVideoEnabled={isVideoEnabled} // Current video state
            isAudioEnabled={isAudioEnabled} // Current audio state
            endRandomCall={endRandomCall} // End current call
            handleRandomCall={handleRandomCall} // Retry or start new call
            isConnecting={isConnecting} // If searching for user
            isSocketIsConnected={isVideoSocketConnected} // Custom logic socket state
            isVideoSocketConnected={!!videoSocket?.connected} // True socket state
          />

          {/* Advanced Controls: Maximize, Zoom, Layout */}
          <VideoAdvanceController
            toggleMaximize={toggleMaximize} // Fullscreen the page
            isMaximized={isMaximized} // Fullscreen flag
            increaseZoom={increaseZoom} // Zoom in
            decreaseZoom={decreaseZoom} // Zoom out
            cycleLayout={cycleLayout} // Toggle layout view
            layout={layout} // Current layout
          />
        </div>
      </div>
    </div>
  );
}
