import React from 'react';
import Button from '../Button/Button';

export interface VideoSuccessToastProps {
    successMessage: string | null;
    setSuccessMessage: (msg: string | null) => void;
}

const VideoSuccessToast: React.FC<VideoSuccessToastProps> = (
    {
        successMessage,
        setSuccessMessage,
    }
) => {
    return (
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
    )
}

export default VideoSuccessToast