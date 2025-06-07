// Imports: React, state management, icons, styles, and types
import {
  Fullscreen,
  MicOff,
  VideoOff,
  Star,
} from 'lucide-react';

import { useState, useEffect } from "react";
import { TVStatic } from "../TVStatic/TVStatic";
import "../../styles/components/VideoBox.css";
import { VideoBoxProps } from "../../types";
import Button from "../Button/Button";
import { connectingMessages } from './message';


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

  // Index for the rotating connecting message
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // State to hold floating particle effects while connecting
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);


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
  const currentMessage = connectingMessages[currentMessageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div
      className={`chime-video-box ${disabledClass} ${noCallClass} ${isActive ? `chime-video-box-${layout}` : ""} ${(label === "You" && layout === "focus-remote") && "chime-remove-the-stream-now"}`}
      style={{ transform: `scale(${zoomLevel})` }}
    >

      {/* Show video stream if available */}
      {stream && (
        <video
          ref={refObject}
          autoPlay
          playsInline
          className="chime-video-element"
        />
      )}

      {/* Camera off state for local user */}
      {!isLocalVideoEnabled && label === "You" && (
        <div className="chime-video-disabled-overlay">
          <div className="chime-video-disabled-icon">
            <VideoOff size={48} />
          </div>
          <p className="chime-video-disabled-text">Camera is off</p>
        </div>
      )}

      {/* Audio muted icon for local user */}
      {label === "You" && !isLocalAudioEnabled && (
        <div className="chime-audio-disabled-indicator">
          <MicOff size={16} />
        </div>
      )}

      {/* Static and hint message when remote user is not in call */}
      {label === "Remote User" && !isInCall && !isConnecting && (
        <div className="chime-static-container">
          <TVStatic />
          <div className="chime-no-call-message">
            <div className="chime-message-box">
              <div className="chime-waiting-icon">
                <Star className="chime-star-icon" />
              </div>
              <p className="chime-waiting-text">Ready for your next connection?</p>
              <div className="chime-pulse-ring"></div>
            </div>
          </div>
        </div>
      )}

      {/* Fun and animated connecting UI */}
      {isConnecting && (
        <div className="chime-connecting-overlay">
          {/* Floating animated particles */}
          <div className="chime-particles-container">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="chime-particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Rotating icon and message while searching */}
          <div className="chime-connecting-content">
            <div className="chime-connecting-spinner-container">
              <div className="chime-spinner-ring"></div>
              <div className="chime-spinner-ring chime-spinner-ring-2"></div>
              <IconComponent className="chime-connecting-icon" size={32} />
            </div>
            <div className="chime-connecting-message">
              <p className="chime-message-text">{currentMessage.text}</p>
              <h2 className="chime-overlay-title">
                <span className="chime-overlay-username">{connectedTo}</span>
              </h2>
            </div>

            {/* Progress dots animation */}
            <div className="chime-progress-dots">
              {[0, 1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className="chime-progress-dot"
                  style={{ animationDelay: `${dot * 0.2}s` }}
                />
              ))}
            </div>
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
      <div className="chime-video-label">{label}</div>

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
