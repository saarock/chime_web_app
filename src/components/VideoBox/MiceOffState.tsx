import { MicOff } from 'lucide-react'; // Importing the MicOff icon from Lucide React

/**
 * MicOffState component
 * Displays a small icon indicator to show that the user's microphone is muted.
 */
const MicOffState = () => {
    return (
        <div className="chime-audio-disabled-indicator">
            {/* Render a 16px MicOff icon to indicate microphone is off */}
            <MicOff size={16} />
        </div>
    );
}

export default MicOffState;
