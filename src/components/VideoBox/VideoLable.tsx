
// Import all the necessary dependencies here
import React from 'react';
import { VideoLabelProps } from '../../types';


/**
 * VideoLabel component
 * Displays a simple label (e.g., username or status) over a video element.
 */
const VideoLabel: React.FC<VideoLabelProps> = ({ label }) => {
    return (
        <div className="chime-video-label">
            {label}
        </div>
    );
};

export default VideoLabel;
