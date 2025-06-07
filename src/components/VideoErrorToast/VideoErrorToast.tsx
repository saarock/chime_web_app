import React from "react";
import Button from "../Button/Button";

export interface VideoErrorToastProps {
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
}

const VideoErrorToast: React.FC<VideoErrorToastProps> = ({
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <div className="chime-message chime-message-left">
      {errorMessage && (
        <div className="chime-alert chime-error">
          <span className="chime-alert-icon" aria-hidden="true">⚠️</span>
          <span>
            {errorMessage} If you're experiencing issues due to this error, please try reloading the app.
          </span>
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
  );
};

export default VideoErrorToast;
