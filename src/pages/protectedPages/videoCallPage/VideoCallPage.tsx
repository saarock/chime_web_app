

import React, { useCallback, useEffect, useReducer, useRef } from "react"
import {
  LoadingComponent,
  VideoAdvanceController,
  VideoBox,
  VideoControllerPanel,
  VideoTitle,
} from "../../../components"
import "../../../styles/pages/VideoCallPage.css";
import { CallReducer, videoInitialState } from "../../../reducers";
import { Loader2 } from "lucide-react";
import { useAuth, useWebRTC} from "../../../hooks";


/**
 * VideoCallPage
 * Main page component for random video chatting.
 * - Sets up local/remote video streams
 * - Manages call state via reducer
 * - Renders video panels and control panels
 */
export default function VideoCallPage() {
  // Retrieve WebRTC streams and call controls from custom hook
  const { localStream, remoteStream, randomCall, endCall, isPartnerCallEnded, partnerIdRef } =
    useWebRTC();

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
  }, [localStream])

  // ─────────────────────────────────────────────────────────────────────────────
  // Sync remote media stream with <video> element and update call flags
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
      dispatch({ type: "SET_IN_CALL", payload: true });
      dispatch({ type: "SET_CONNECTING", payload: false });
    } else {
      // No remote stream means no ongoing call
      dispatch({ type: "SET_IN_CALL", payload: false });
    }
  }, [remoteStream])

  // ─────────────────────────────────────────────────────────────────────────────
  // Handle partner hang-up: show connecting state again
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPartnerCallEnded) {
      // When partner ends, transition back to searching state
      dispatch({ type: "SET_IN_CALL", payload: false })
      dispatch({ type: "SET_CONNECTING", payload: true })
    }
  }, [isPartnerCallEnded]);




  // useEffect(() => {
  //   if (!remoteStream && partnerIdRef.current) {
  //     partnerIdRef.current = null;
  //     dispatch({ type: "SET_IN_CALL", payload: false });
  //     dispatch({ type: "SET_CONNECTING", payload: true });
  //     randomCall();
  //   }
  // }, [remoteStream]);



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
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [endCall]);





  // ─────────────────────────────────────────────────────────────────────────────
  // Call control callbacks
  // ─────────────────────────────────────────────────────────────────────────────

  // Initiates or retries random call search
  const handleRandomCall = useCallback(() => {
    dispatch({ type: "SET_CONNECTING", payload: true })
    randomCall()
  }, [randomCall])

  // Ends current call and resets flags
  const endRandomCall = useCallback(() => {
    endCall()
    dispatch({ type: "SET_IN_CALL", payload: false })
    dispatch({ type: "SET_CONNECTING", payload: false })
  }, [endCall])

  // Toggle local video tracks
  const toggleVideo = useCallback(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach((t) => (t.enabled = !state.isVideoEnabled))
      dispatch({ type: "TOGGLE_VIDEO" })
    }
  }, [localStream, state.isVideoEnabled])

  // Toggle local audio tracks
  const toggleAudio = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((t) => (t.enabled = !state.isAudioEnabled))
      dispatch({ type: "TOGGLE_AUDIO" })
    }
  }, [localStream, state.isAudioEnabled])

  // Toggle browser fullscreen mode for entire page
  const toggleMaximize = useCallback(() => {
    dispatch({ type: "TOGGLE_MAXIMIZED" })
    const elem = document.documentElement
    if (!state.isMaximized) elem.requestFullscreen?.()
    else document.exitFullscreen?.()
  }, [state.isMaximized])

  // Zoom controls for video panels
  const increaseZoom = useCallback(() => dispatch({ type: "SET_ZOOM", payload: state.zoomLevel + 0.1 }), [state.zoomLevel])
  const decreaseZoom = useCallback(() => dispatch({ type: "SET_ZOOM", payload: state.zoomLevel - 0.1 }), [state.zoomLevel])

  // Cycle between side-by-side and focus-remote layouts
  const cycleLayout = useCallback(
    () => dispatch({ type: "SET_LAYOUT", payload: state.layout === "side-by-side" ? "focus-remote" : "side-by-side" }),
    [state.layout]
  )

  // Fullscreen for individual video elements
  const toggleFullScreenElem = useCallback((ref: React.RefObject<HTMLVideoElement>) => {
    if (!ref.current) return
    const isFs = !!document.fullscreenElement
    if (isFs) document.exitFullscreen?.()
    else ref.current.requestFullscreen?.()
  }, []);




  // ─────────────────────────────────────────────────────────────────────────────
  // Render: show placeholder while checking the user-tokens
  // ─────────────────────────────────────────────────────────────────────────────
  if (!isAuthenticated || !user) {
    return <LoadingComponent />
  }



  // ─────────────────────────────────────────────────────────────────────────────
  // Render: show placeholder until local stream is ready
  // ─────────────────────────────────────────────────────────────────────────────
  if (!localStream) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white px-4 text-center">
        <div className="animate-spin mb-6">
          <Loader2 size={64} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Searching for Camera Access...</h2>
        <p className="text-base text-gray-300 max-w-md">
          Please allow access to your camera and microphone in the browser settings to start video chatting.
        </p>
      </div>
    )
  }


  return (
    <div className={`video-call-page ${state.isMaximized ? "maximized" : ""}`}>
      <div className="video-call-container">
        <VideoTitle />
        <div className={`video-grid layout-${state.layout}`}>
          <VideoBox
            stream={localStream}
            refObject={localVideoRef}
            label="You"
            isActive={true}
            isLocalVideoEnabled={state.isVideoEnabled}
            isConnecting={false}
            isInCall={state.isInCall}
            zoomLevel={state.zoomLevel}
            layout={state.layout}
            onFullscreen={() => toggleFullScreenElem(localVideoRef)}
          />
          <VideoBox
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
          />
        </div>
        <div className={`controls-container ${state.isMaximized ? `controls-container-${state.layout}` : ""}`}>
          <VideoControllerPanel
            isRemoteStream={remoteStream ? true : false}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            isVideoEnabled={state.isVideoEnabled}
            isAudioEnabled={state.isAudioEnabled}
            endRandomCall={endRandomCall}
            handleRandomCall={handleRandomCall}
            isConnecting={state.isConnecting}
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
  )
}

