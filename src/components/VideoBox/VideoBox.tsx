// Import all the necessary dependencies here
import { Fullscreen, Loader2, MicOff, VideoOff } from "lucide-react";
import { TVStatic } from "../TVStatic/TVStatic";
import "../../styles/components/VideoBox.css";
import { VideoBoxProps } from "../../types";
import Button from "../Button/Button";


// VideoBox component displays local or remote user's video, connection status, and audio/video state
function VideoBox({
  refObject,
  label,
  isActive,
  isLocalAudioEnabled = true,
  isConnecting = false,
  isInCall = false,
  isLocalVideoEnabled = true,
  zoomLevel,
  layout,
  onFullscreen,
  stream,
  isRemoteAudioEnable,
  isRemoteVideoEnable,
}: VideoBoxProps) {

  // CSS class for when local video is disabled
  const disabledClass = !isLocalVideoEnabled ? "chime-video-box-video-disabled" : "";

  // CSS class for remote user when there is no ongoing call
  const noCallClass = !isInCall && label === "Remote User" ? "chime-video-box-no-call" : "";

  return (
    <div
      className={`chime-video-box ${disabledClass} ${noCallClass} ${isActive ? `chime-video-box-${layout}` : ""} ${(label === "You" && layout === "focus-remote") && "chime-remove-the-stream-now"}`}
      style={{ transform: `scale(${zoomLevel})` }}
    >
      {/* Dark gradient overlay for design */}
      <div className="chime-video-gradient-overlay" />

      {/* Render video only if stream exists */}
      {stream && (
        <video
          ref={refObject}
          autoPlay
          playsInline
          className={`chime-video-element`}
        />
      )}

      {/* Local user's video is disabled */}
      {!isLocalVideoEnabled && label === "You" && (
        <div className="chime-video-disabled-overlay">
          <div className="chime-video-disabled-icon">
            <VideoOff size={48} />
          </div>
        </div>
      )}

      {/* Remote user's video is disabled */}
      {!isRemoteVideoEnable && label === "Remote User" && (
        <div className="chime-video-disabled-overlay">
          <div className="chime-video-disabled-icon">
            <VideoOff size={48} />
          </div>
        </div>
      )}

      {/* Show muted audio icon for local user */}
      {label === "You" && !isLocalAudioEnabled && (
        <div className="chime-audio-disabled-indicator">
          <MicOff size={16} />
        </div>
      )}

      {/* Show muted audio icon for remote user */}
      {label === "Remote User" && !isRemoteAudioEnable && (
        <div className="chime-audio-disabled-indicator">
          <MicOff size={16} />
        </div>
      )}

      {/* Display TV static and instructions when there is no active call */}
      {label === "Remote User" && !isInCall && !isConnecting && (
        <div className="chime-static-container">
          <TVStatic />
          <div className="chime-no-call-message">
            <div className="chime-message-box">
              <p>Click "Random Call" to find someone</p>
            </div>
          </div>
        </div>
      )}

      {/* Show loading overlay while connecting */}
      {isConnecting && (
        <div className="chime-connecting-overlay">
          <div className="chime-connecting-content">
            <Loader2 size={48} className="chime-connecting-spinner" />
            <p>Finding someone to chat with...</p>
          </div>
        </div>
      )}

      {/* Video label (e.g., "You" or "Remote User") */}
      <div className="chime-video-label">{label}</div>

      {/* Fullscreen toggle button */}
      <Button
        className="chime-fullscreen-button"
        onClick={onFullscreen}
        aria-label={`Toggle fullscreen for ${label.toLowerCase()}`}
      >
        <Fullscreen size={16} />
      </Button>
    </div>
  );
}

export default VideoBox;
