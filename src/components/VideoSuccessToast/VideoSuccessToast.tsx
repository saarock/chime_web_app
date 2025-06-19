// Import all the necessary dependencies here
import React from 'react';
import Button from '../Button/Button';
import { Variant, VideoSuccessToastProps } from '../../types';



/**
 * 
 * @param {string} param0.successMessage - SuccessMessage reveived from the server while conneting, partner found or connected and so on.
 * @param {Function} param0.setSuccessMessage - Function to clean the current successMessge state or remove the toast / message
 * @returns {React.FC}
 */
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
                        variant={Variant.danger}
                    >
                        ×
                    </Button>
                </div>
            )}
        </div>
    )
}

export default VideoSuccessToast