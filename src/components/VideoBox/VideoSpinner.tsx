// Import all the necessary dependencies here
import React from 'react';
import { VideoSpinnerProps } from '../../types';


/**
 * VideoSpinner component
 * Displays a spinner animation with two rotating rings and a centered icon.
 * Useful for showing loading or connecting states in video UI.
 */
const VideoSpinner: React.FC<VideoSpinnerProps> = ({ IconComponent }) => {
    return (
        <div className="chime-connecting-spinner-container">
            <div className="chime-spinner-ring"></div>
            <div className="chime-spinner-ring chime-spinner-ring-2"></div>
            {/* Render the passed icon with fixed size */}
            <IconComponent className="chime-connecting-icon" size={32} />
        </div>
    );
};

export default VideoSpinner;
