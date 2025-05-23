import { Loader2, Mic, MicOff, Phone, PhoneOff, Video, VideoOff } from 'lucide-react';
import React from 'react';

interface VideoControllerPanelProps {
    toggleAudio: () => void;
    isAudioEnabled: boolean;
    toggleVideo: () => void;
    isVideoEnabled: boolean;
    endRandomCall: () => void;
    handleRandomCall: () => void;
    isConnecting: boolean;

}

const VideoControllerPanel: React.ComponentType<VideoControllerPanelProps> = (
    {
        toggleAudio,
        isAudioEnabled,
        isVideoEnabled,
        toggleVideo,
        endRandomCall,
        handleRandomCall,
        isConnecting,
    }
) => {
    return (
        <div className="controls-panel">
            <button
                onClick={toggleAudio}
                className={`control-button ${!isAudioEnabled ? "control-disabled" : ""}`}
                aria-label={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
            >
                {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
            </button>

            <button
                onClick={toggleVideo}
                className={`control-button ${!isVideoEnabled ? "control-disabled" : ""}`}
                aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
            >
                {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
            </button>

            <button onClick={endRandomCall} className="control-button end-call" aria-label="End call">
                <PhoneOff size={24} />
            </button>

            <button
                onClick={handleRandomCall}
                disabled={isConnecting}
                className={`control-button call-button ${isConnecting ? "connecting" : ""}`}
                aria-label="Start random call"
            >
                {isConnecting ? (
                    <>
                        <Loader2 size={20} className="spinner" />
                        <span>Connecting...</span>
                    </>
                ) : (
                    <>
                        <Phone size={20} />
                        <span>Random Call</span>
                    </>
                )}
            </button>
        </div>
    )
}

export default VideoControllerPanel