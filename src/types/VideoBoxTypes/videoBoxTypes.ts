import { LucideIcon } from "lucide-react";

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
  connectedTo?: string;                           // Partner
}


/**
 * Props for the Video component.
 * You can extend this interface later if needed.
 */
export interface VideoProps {
  // Add any additional props here (if needed in the future)
}



/**
 * Props for the VideoConnectingMessages component
 * - currentMessage: A message indicating the connection state (e.g., "Connecting...", "Connected")
 * - connectedTo: The name or ID of the user/device being connected to
 */
export interface VideoConnectingMessagesProps {
  currentMessage: string;
  connectedTo: string;
}


/**
 * Props for the VideoFloatingAnimationParticles component
 * - particles: An array of objects representing each particle's position and animation delay
 */
export interface VideoFloatingAnimationParticlesProps {
  particles: Array<{
    id: number;
    x: number;      // Horizontal position in percentage (0 to 100)
    y: number;      // Vertical position in percentage (0 to 100)
    delay: number;  // Animation delay in seconds
  }>;
}

export interface VideoLabelProps {
  label: string; // The text label to display on the video
}

export interface VideoSpinnerProps {
    /**
     * IconComponent: A Lucide icon component to render inside the spinner.
     * This allows customizable icons with consistent styling.
     */
    IconComponent: LucideIcon;
}
