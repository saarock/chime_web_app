// Props definition for the VideoControllerPanel component
export interface VideoControllerPanelProps {
  toggleAudio: () => void;          // Function to toggle microphone
  isAudioEnabled: boolean;          // Indicates if the microphone is enabled
  toggleVideo: () => void;          // Function to toggle camera
  isVideoEnabled: boolean;          // Indicates if the video is enabled
  endRandomCall: () => void;        // Function to end the current random call
  handleRandomCall: () => void;     // Function to initiate a random call
  isConnecting: boolean;            // Indicates if the system is currently connecting
  isRemoteStream: boolean;          // Indicates if there's a remote stream (i.e., an active call)
  isSocketIsConnected: boolean;     // Indicates if there is socket connected or not 
  isVideoSocketConnected: boolean;                // Helps to check the socket is connected to the server or not for the saftey
  isInCall: boolean                           // True when user is in the call other-wise false

}
