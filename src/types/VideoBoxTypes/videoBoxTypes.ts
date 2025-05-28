// Props definition for VideoBox component
export interface VideoBoxProps {
  refObject: React.RefObject<HTMLVideoElement>;   // Reference to the video DOM element
  label: string;                                  // Label for the video box ("You" or "Remote User")
  isActive: boolean;                              // Whether this video box is currently active (used for layout)
  isLocalAudioEnabled?: boolean;                  // Whether local user's audio is enabled
  isConnecting?: boolean;                         // Whether app is currently connecting to a peer
  isInCall?: boolean;                             // Whether a call is currently active
  isLocalVideoEnabled?: boolean;                  // Whether local user's video is enabled
  zoomLevel: number;                              // Zoom scale to apply to the video box
  layout: "side-by-side" | "focus-remote";        // Layout mode
  onFullscreen: () => void;                       // Callback for fullscreen button
  stream: MediaStream | null;                     // The video/audio stream to attach to <video>
  isRemoteAudioEnable?: boolean;                  // Whether remote user's audio is enabled
  isRemoteVideoEnable?: boolean;                  // Whether remote user's video is enabled
}
