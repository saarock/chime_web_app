// Import all the necessary dependencies here
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
import { VideoControllerPanelProps } from "../../types";
import Button from "../Button/Button";
import { useError } from "../../hooks";
import { toast } from "react-toastify";

// VideoControllerPanel displays control buttons for mic, camera, call, and random match.
// It uses icons from lucide-react and accepts various props to handle UI logic.

const VideoControllerPanel: React.FC<VideoControllerPanelProps> = ({
  toggleAudio,         // Toggles the microphone on/off
  isAudioEnabled,      // Current state of microphone (true = unmuted)
  isVideoEnabled,      // Current state of video (true = enabled)
  toggleVideo,         // Toggles the camera on/off
  endRandomCall,       // Ends the current call
  handleRandomCall,    // Starts a new random call
  isConnecting,        // Whether the app is currently trying to connect
  isRemoteStream,      // Whether a remote stream is active (i.e., in a call)
  isSocketIsConnected, // Whether a socket is connected
  isVideoSocketConnected,   // Helps to check the socket is connected to the server or not for the saftey

}) => {
  const { isError } = useError(); // Check is there any error during the auth 
  return (
    <div className="chime-controls-panel">
      {/* Toggle Microphone Button */}
      <Button
        onClick={toggleAudio}
        className={`chime-control-button ${!isAudioEnabled ? "chime-control-disabled" : ""}`}
        aria-label={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
      >
        {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
      </Button>

      {/* Toggle Video Button */}
      <Button
        onClick={toggleVideo}
        className={`chime-control-button ${!isVideoEnabled ? "chime-control-disabled" : ""}`}
        aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
      >
        {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
      </Button>

      {/* End Call Button (only active if there's a remote stream or it's connecting) */}
      <Button
        onClick={endRandomCall}
        className="chime-control-button chime-end-call"
        aria-label="End call"
        disabled={!(isRemoteStream && !isConnecting)} // If remoteStream found and isConnecting is false then only enable the end-call buttin otherwise disable. Donot allow to user random cut
        style={{
          cursor: isRemoteStream || isConnecting ? "pointer" : "not-allowed",
        }}
      >
        <PhoneOff size={24} />
      </Button>

      {/* Start Random Call Button (disabled while connecting) */}
      <Button
        onClick={handleRandomCall}
        disabled={isConnecting || !isSocketIsConnected || isError || !isVideoSocketConnected}
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
      </Button>

    </div>
  );
};

export default VideoControllerPanel;
