// Imports: React, state management, icons, styles, and types
import {
  Fullscreen,
} from 'lucide-react';

import { useState, useEffect } from "react";
import "../../styles/components/VideoBox.css";
import { VideoBoxProps } from "../../types";
import Button from "../Button/Button";
import { connectingMessages } from './message';
import Video from './Video';
import CameraOffState from './CameraOffState';
import MiceOffState from './MiceOffState';
import VideoStaticContainer from './VideoStaticContainer';
import VideoFloatingAnimationParticlces from './VideoFloatingAnimationParticlces';
import VideoSpinner from './VideoSpinner';
import VideoConnectingMessages from './VideoConnectingMessages';
import VideoProgressDots from './VideoProgressDots';
import VideoLable from './VideoLable';


/**
 * Renders a video container box for displaying a user's video stream
 * in a video call UI, including optional states like connection, mute, zoom, etc.
 *
 * @param {object} props - The properties for the VideoBox component.
 * @param {React.RefObject<HTMLDivElement>} props.refObject - A React ref for accessing the video container DOM element.
 * @param {string} props.label - Label shown on the video box (e.g., username or "You").
 * @param {boolean} props.isActive - Indicates whether this video box is the currently active speaker or selected user.
 * @param {boolean} [props.isLocalAudioEnabled=true] - Determines if the local user's microphone is on.
 * @param {boolean} [props.isConnecting=false] - Whether the user is still connecting (e.g., spinner should be shown).
 * @param {boolean} [props.isInCall=false] - Indicates if the user is currently in a call (vs. disconnected).
 * @param {boolean} [props.isLocalVideoEnabled=true] - Determines if the local video stream is enabled.
 * @param {number} [props.zoomLevel] - Optional zoom level for the video box (used for layout control or focus).
 * @param {'side-by-side' | 'focus-mode'} props.layout - Defines the layout style for the video grid;
 * @param {() => void} props.onFullscreen - Function called when user clicks to toggle fullscreen mode.
 * @param {MediaStream | null} props.stream - The actual media stream to be rendered in the video element.
 * @param {string} [props.connectedTo] - Optional ID or label showing whom the user is connected to.
 *
 * @returns {JSX.Element} VideoBox component rendering the video stream with labels and states.
 */
function VideoBox({
  refObject,
  label,
  isActive,
  isLocalAudioEnabled = true,
  isConnecting = false,
  isInCall = false,
  isLocalVideoEnabled = true,
  zoomLevel,
  layout,
  onFullscreen,
  stream,
  connectedTo,
}: VideoBoxProps) {



  // State to hold floating particle effects while connecting
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);



  /**
   * Rotate connecting messages every 2 seconds when in connecting state.
   */
  useEffect(() => {
    if (isConnecting) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % connectingMessages.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isConnecting]);



  /**
   * Generate animated particle effects randomly across the screen while connecting.
   */
  useEffect(() => {
    if (isConnecting) {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    }
  }, [isConnecting]);


  // Dynamic classnames based on user role and states
  const disabledClass = !isLocalVideoEnabled ? "chime-video-box-video-disabled" : "";
  const noCallClass = !isInCall && label === "Remote User" ? "chime-video-box-no-call" : "";
  // Index for the rotating connecting message
  const currentMessage = connectingMessages[currentMessageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div
      className={`chime-video-box ${disabledClass} ${noCallClass} ${isActive ? `chime-video-box-${layout}` : ""} ${(label === "You" && layout === "focus-remote") && "chime-remove-the-stream-now"}`}
      style={{ transform: `scale(${zoomLevel})` }}
    >

      {/* Show video stream if available */}
      {stream && (
        <Video ref={refObject} />
      )}

      {/* Camera off state for local user */}
      {!isLocalVideoEnabled && label === "You" && (
        <CameraOffState />
      )}

      {/* Audio muted icon for local user */}
      {label === "You" && !isLocalAudioEnabled && (
        <MiceOffState />
      )}

      {/* Static and hint message when remote user is not in call */}
      {label === "Remote User" && !isInCall && !isConnecting && (
        <VideoStaticContainer />
      )}

      {/* Fun and animated connecting UI */}
      {isConnecting && (
        <div className="chime-connecting-overlay">
          {/* Floating animated particles */}

          <VideoFloatingAnimationParticlces particles={particles} />

          {/* Rotating icon and message while searching */}
          <div className="chime-connecting-content">
            <VideoSpinner IconComponent={IconComponent} />
            <VideoConnectingMessages currentMessage={currentMessage.text} connectedTo={connectedTo ? connectedTo : 'Connected to unknown'} />

            {/* Progress dots animation */}
            <VideoProgressDots />
          </div>

          {/* Background animated waves for aesthetic */}
          <div className="chime-bg-animation">
            <div className="chime-wave chime-wave-1"></div>
            <div className="chime-wave chime-wave-2"></div>
            <div className="chime-wave chime-wave-3"></div>
          </div>
        </div>
      )}

      {/* Name label below each video box */}
      <VideoLable label={label} />
      {/* <VideoLabel label={label} isLocalStreamIsOn={label === "You" && stream ? true : false} /> */}

      {/* Fullscreen toggle button */}
      <Button
        className="chime-fullscreen-button"
        onClick={onFullscreen}
        aria-label={`Toggle fullscreen for ${label.toLowerCase()}`}
      >
        <Fullscreen size={16} />
      </Button>

    </div>
  );
}

export default VideoBox;
