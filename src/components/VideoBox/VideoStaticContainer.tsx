// Import all the necessary dependencies here
import { TVStatic } from '../TVStatic/TVStatic';
import { Star } from 'lucide-react';

/**
 * VideoStaticContainer component
 * Displays a static TV screen with a message indicating readiness for the next call.
 * Includes a decorative star icon and a pulse animation ring.
 */
const VideoStaticContainer = () => {
    return (
        <div className="chime-static-container">
            {/* Static TV screen visual */}
            <TVStatic />

            {/* Overlay message prompting user readiness */}
            <div className="chime-no-call-message">
                <div className="chime-message-box">
                    {/* Star icon decoration */}
                    <div className="chime-waiting-icon">
                        <Star className="chime-star-icon" />
                    </div>

                    {/* Informative text */}
                    <p className="chime-waiting-text">Ready for your next connection?</p>

                    {/* Pulse ring animation for visual emphasis */}
                    <div className="chime-pulse-ring"></div>
                </div>
            </div>
        </div>
    );
};

export default VideoStaticContainer;
