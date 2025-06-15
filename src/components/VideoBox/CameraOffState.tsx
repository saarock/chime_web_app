import { VideoOff } from 'lucide-react'; // Importing the VideoOff icon from Lucide React

/**
 * CameraOffState component
 * This component is displayed as an overlay when the user's camera is turned off.
 * It includes a video-off icon and a message to indicate the camera status.
 */
const CameraOffState = () => {
    return (
        <div className="chime-video-disabled-overlay">
            {/* Icon container for the video-off state */}
            <div className="chime-video-disabled-icon">
                <VideoOff size={48} /> {/* Display a 48px VideoOff icon */}
            </div>
            {/* Informative text to indicate camera is turned off */}
            <p className="chime-video-disabled-text">Camera is off</p>
        </div>
    );
}

export default CameraOffState;
