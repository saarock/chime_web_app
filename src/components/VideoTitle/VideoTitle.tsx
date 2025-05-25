import React from "react";
import "../../styles/components/VideoTitle.css";

interface VideoTitleProps {
  errorMessage: string | null;
  successMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  onlineUsersCount: number
}

const VideoTitle: React.FC<VideoTitleProps> = ({
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
  onlineUsersCount
}) => {
  return (
    <div className="chime-video-title-container">
      {/* Left error message */}
      <div className="chime-message chime-message-left">
        {errorMessage && (
          <div className="chime-alert chime-error">
            <span className="chime-alert-icon" aria-hidden="true">⚠️</span>
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="chime-alert-remove"
              aria-label="Dismiss error message"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Center title */}
      <div className="chime-video-title-content">
        <h1 className="chime-video-title-heading">🎥 Random Video Chat</h1> <div className="chime-online-indicator">
          <span className="chime-online-dot" />
          <span>{onlineUsersCount} online</span>
        </div>

      </div>

      {/* Right success message */}
      <div className="chime-message chime-message-right">
        {successMessage && (
          <div className="chime-alert chime-success">
            <span className="chime-alert-icon" aria-hidden="true">✔️</span>
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage(null)}
              className="chime-alert-remove"
              aria-label="Dismiss success message"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTitle;
