import { Fullscreen, Loader2, MicOff, VideoOff } from "lucide-react";
import { TVStatic } from "../TVStatic/TVStatic";
import "../../styles/components/VideoBox.css";

// Video Box (Local & Remote)
interface VideoBoxProps {
  refObject: React.RefObject<HTMLVideoElement>;
  label: string;
  isActive: boolean;
  isLocalAudioEnabled?: boolean;
  isConnecting?: boolean;
  isInCall?: boolean;
  isLocalVideoEnabled?: boolean;
  zoomLevel: number;
  layout: "side-by-side" | "focus-remote";
  onFullscreen: () => void;
  stream: MediaStream | null;
}
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
}: VideoBoxProps) {
  const disabledClass = !isLocalVideoEnabled ? "chime-video-box-video-disabled" : "";
  const noCallClass = !isInCall && label === "Remote User" ? "chime-video-box-no-call" : "";
  return (
    <div
      className={`chime-video-box ${disabledClass} ${noCallClass} ${
        isActive ? `chime-video-box-${layout}` : ""
      }`}
      style={{ transform: `scale(${zoomLevel})` }}
    >
      <div className="chime-video-gradient-overlay" />
      {stream && (
        <video
          ref={refObject}
          autoPlay
          playsInline
          muted={label === "You"}
          className="chime-video-element"
        />
      )}
      {!isLocalVideoEnabled && label === "You" && (
        <div className="chime-video-disabled-overlay">
          <div className="chime-video-disabled-icon">
            <VideoOff size={48} />
          </div>
        </div>
      )}
      {/* Audio indicator */}
      {!isLocalAudioEnabled && (
        <div className="chime-audio-disabled-indicator">
          <MicOff size={16} />
        </div>
      )}

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
      {isConnecting && (
        <div className="chime-connecting-overlay">
          <div className="chime-connecting-content">
            <Loader2 size={48} className="chime-connecting-spinner" />
            <p>Finding someone to chat with...</p>
          </div>
        </div>
      )}
      <div className="chime-video-label">{label}</div>
      <button
        className="chime-fullscreen-button"
        onClick={onFullscreen}
        aria-label={`Toggle fullscreen for ${label.toLowerCase()}`}
      >
        <Fullscreen size={16} />
      </button>
    </div>
  );
}

export default VideoBox;
