// Import all the necessary dependencies here
import React from 'react';
import { VideoProps } from '../../types';


/**
 * Video component
 * This renders a video element and allows the parent to attach a ref to it
 * (e.g., to attach a WebRTC stream).
 */
const Video = React.forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
    return (
        <video
            ref={ref}
            autoPlay
            playsInline
            className="chime-video-element"
            {...props} // Spread other props if needed
        />
    );
});

Video.displayName = 'Video'; // For better devtools/debugging experience

export default Video;
