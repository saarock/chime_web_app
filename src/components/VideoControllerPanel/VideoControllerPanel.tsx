import {
  Loader2,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Video,
  VideoOff,
} from "lucide-react";
import React from "react";
import "../../styles/components/VideoControllerPanel.css";

interface VideoControllerPanelProps {
  toggleAudio: () => void;
  isAudioEnabled: boolean;
  toggleVideo: () => void;
  isVideoEnabled: boolean;
  endRandomCall: () => void;
  handleRandomCall: () => void;
  isConnecting: boolean;
  isRemoteStream: boolean;
}

const VideoControllerPanel: React.ComponentType<VideoControllerPanelProps> = ({
  toggleAudio,
  isAudioEnabled,
  isVideoEnabled,
  toggleVideo,
  endRandomCall,
  handleRandomCall,
  isConnecting,
  isRemoteStream,
}) => {
  return (
   <div className="chime-controls-panel">
  <button
    onClick={toggleAudio}
    className={`chime-control-button ${!isAudioEnabled ? "chime-control-disabled" : ""}`}
    aria-label={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
  >
    {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
  </button>

  <button
    onClick={toggleVideo}
    className={`chime-control-button ${!isVideoEnabled ? "chime-control-disabled" : ""}`}
    aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
  >
    {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
  </button>

  <button
    onClick={endRandomCall}
    className="chime-control-button chime-end-call"
    aria-label="End call"
    disabled={!(isRemoteStream || isConnecting)}
    style={{
      cursor: isRemoteStream || isConnecting ? "pointer" : "not-allowed",
    }}
  >
    <PhoneOff size={24} />
  </button>

  <button
    onClick={handleRandomCall}
    disabled={isConnecting}
    className={`chime-control-button chime-call-button ${isConnecting ? "connecting" : ""}`}
    aria-label="Start random call"
  >
    {isConnecting ? (
      <>
        <Loader2 size={20} className="chime-spinner" />
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

  );
};

export default VideoControllerPanel;
