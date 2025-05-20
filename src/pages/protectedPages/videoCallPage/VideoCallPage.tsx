"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Loader2,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Layout,
  Fullscreen,
} from "lucide-react"
import { TVStatic } from "../../../components"
import "../../../styles/pages/VideoCallPage.css";
import useWebRTC from "../../../hooks/useWebRTC"


export default function VideoCallPage() {
  const { localStream, remoteStream, randomCall, endCall, usersConnected } = useWebRTC()
  const localVideoRef = useRef<HTMLVideoElement>(null!)
  const remoteVideoRef = useRef<HTMLVideoElement>(null!)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isInCall, setIsInCall] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [layout, setLayout] = useState<"side-by-side" | "picture-in-picture" | "focus-remote">("side-by-side");
  const [isFullScreen] = useState<boolean>(false);


  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
      setIsInCall(true)
      setIsConnecting(false)
    } else {
      setIsInCall(false)
    }
  }, [remoteStream]);




  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoEnabled
      })
      setIsVideoEnabled(!isVideoEnabled)
    }
  }

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isAudioEnabled
      })
      setIsAudioEnabled(!isAudioEnabled)
    }
  }

  const handleRandomCall = useCallback(() => {
    setIsConnecting(true)
    randomCall()
    setIsMaximized(true);
  }, [randomCall])

  const endRandomCall = () => {
    endCall()
    setIsInCall(false);
    setIsConnecting(false);
    setIsMaximized(false);
  }

  const toggleMaximize = () => {
    setIsMaximized(true)
  }

  const increaseZoom = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.1)
    }
  }

  const decreaseZoom = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1)
    }
  }

  const cycleLayout = () => {
    if (layout === "side-by-side") {
      setLayout("picture-in-picture")
    } else if (layout === "picture-in-picture") {
      setLayout("focus-remote")
    } else {
      setLayout("side-by-side")
    }
  }

  const toggleFullScreen = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return

    const videoElement = videoRef.current;

    const isFullScreen =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;
    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error(`Error attempting to exit full-screen mode: ${err.message}`)
          return;
        })
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    } else {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to request full-screen mode: ${err.message}`);
        });
      } else if ((videoElement as any).webkitRequestFullscreen) {
        (videoElement as any).webkitRequestFullscreen();
      } else if ((videoElement as any).mozRequestFullScreen) {
        (videoElement as any).mozRequestFullScreen();
      } else if ((videoElement as any).msRequestFullscreen) {
        (videoElement as any).msRequestFullscreen();

      }
    }
  }


useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    const confirmationMessage = 'It looks like you have been editing something. If you leave before saving, your changes will be lost.';
    e.preventDefault(); // Some browsers require this
    e.returnValue = confirmationMessage; // Chrome requires returnValue to be set
    return confirmationMessage;
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);


  return (
    <div className={`video-call-page ${isMaximized ? "maximized" : ""}`}>
      <div className="video-call-container">

        {
          isMaximized ? "" : <div className="video-title-container">
            <div className="video-title">
              <h1>Random Video Chat</h1>
            </div>
          </div>
        }

        <div className={`video-grid layout-${layout}`}>
          {/* Local Video */}
          <div
            className={`video-box local-video ${!isVideoEnabled ? "video-disabled" : ""}`}
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="video-gradient-overlay"></div>
            <video ref={localVideoRef} autoPlay muted playsInline className="video-element" />
            {!isVideoEnabled && (
              <div className="video-disabled-overlay">
                <div className="video-disabled-icon">
                  <VideoOff size={48} />
                </div>
              </div>
            )}
            <div className="video-label">You</div>
            <button
              className="fullscreen-button"
              onClick={() => toggleFullScreen(localVideoRef)}
              aria-label="Toggle fullscreen for local video"
            >
              <Fullscreen size={16} />
            </button>

            {/* Audio indicator */}
            {!isAudioEnabled && (
              <div className="audio-disabled-indicator">
                <MicOff size={16} />
              </div>
            )}
          </div>

          {/* Remote Video */}
          <div
            className={`video-box remote-video ${!isInCall ? "no-call" : ""}`}
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="video-gradient-overlay"></div>
            <video ref={remoteVideoRef} autoPlay playsInline className="video-element" />

            {!isInCall && !isConnecting && (
              <div className="static-container">
                <TVStatic />
                <div className="no-call-message">
                  <div className="message-box">
                    <p>Click "Random Call" to find someone</p>
                  </div>
                </div>
              </div>
            )}

            {isConnecting && (
              <div className="connecting-overlay">
                <div className="connecting-content">
                  <Loader2 size={48} className="connecting-spinner" />
                  <p>Finding someone to chat with...</p>
                </div>
              </div>
            )}

            <div className="video-label">Remote User</div>
            <button
              className="fullscreen-button"
              onClick={() => toggleFullScreen(remoteVideoRef)}
              aria-label="Toggle fullscreen for remote video"
            >
              <Fullscreen size={16} />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-container">
          <div className="gradient-overlay"></div>

          <div className="controls-panel">
            <button
              onClick={toggleAudio}
              className={`control-button ${!isAudioEnabled ? "control-disabled" : ""}`}
              aria-label={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
            >
              {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
            </button>

            <button
              onClick={toggleVideo}
              className={`control-button ${!isVideoEnabled ? "control-disabled" : ""}`}
              aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
            >
              {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
            </button>

            <button onClick={endRandomCall} className="control-button end-call" aria-label="End call">
              <PhoneOff size={24} />
            </button>

            <button
              onClick={handleRandomCall}
              disabled={isConnecting}
              className={`control-button call-button ${isConnecting ? "connecting" : ""}`}
              aria-label="Start random call"
            >
              {isConnecting ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Phone size={20} />
                  <span>Random Call</span>
                </>
              )}
            </button>
          </div>

          <div className="advanced-controls">
            <button
              onClick={toggleMaximize}
              className="advanced-control-button"
              aria-label={isMaximized ? "Minimize" : "Maximize"}
            >
              {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            <button onClick={increaseZoom} className="advanced-control-button" aria-label="Zoom in">
              <ZoomIn size={20} />
            </button>

            <button onClick={decreaseZoom} className="advanced-control-button" aria-label="Zoom out">
              <ZoomOut size={20} />
            </button>

            <button onClick={cycleLayout} className="advanced-control-button" aria-label="Change layout">
              <Layout size={20} />
              <span className="layout-name">{layout.replace(/-/g, " ")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
