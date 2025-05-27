import React from "react";
import "../../styles/components/VideoTitle.css";
import Button from "../Button/Button";
import { VideoTitleProps } from "../../types";



const VideoTitle: React.ComponentType<VideoTitleProps> = ({
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
            <Button
              onClick={() => setErrorMessage(null)}
              className="chime-alert-remove"
              aria-label="Dismiss error message"
            >
              ×
            </Button>
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
            <Button
              onClick={() => setSuccessMessage(null)}
              className="chime-alert-remove"
              aria-label="Dismiss success message"
            >
              ×
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTitle;
