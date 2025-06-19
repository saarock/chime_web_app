
// Import all the necessary dependencies here
import React, { JSX, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import gsap from "gsap";
import "../../styles/components/HeroSection.css";
import Button from "../Button/Button";
import { Variant } from "../../types";
import { useAuth } from "../../hooks";

/**
 * Chime Hero Section component.
 * This section introduces users to the random video call feature, explaining 
 * the gender-based matching system and how it works with location-based filters.
 * 
 * @returns {JSX.Element} - The JSX code that renders the hero section of the app.
 */
const HeroSection: React.ComponentType = (): JSX.Element => {
  // All the hook goes here
  const {isAuthenticated} = useAuth();
  useEffect(() => {
    // GSAP Animation: Fade In and Slide Title and Description
    gsap.from(".chime-hero-title", {
      opacity: 0,
      y: -50,
      duration: 0.6,
      ease: "power4.out",
    });

    gsap.from(".chime-hero-description", {
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: 0.5,
      ease: "power4.out",
    });

    gsap.from(".chime-hero-buttons", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 1,
      ease: "power4.out",
    });

    gsap.from(".chime-safety-panel", {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 1.5,
      ease: "power4.out",
    });

    // Avatar Scaling Animation
    gsap.from(".chime-user-avatar", {
      opacity: 0,
      scale: 0.6,
      stagger: 0.2,
      duration: 1.5,
      delay: 2,
      ease: "power4.out",
    });

  }, []);


  useEffect(() => {
    // GSAP Animation: Fade In and Slide Title and Description
    gsap.to(".chime-hero-title", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
    });

    gsap.to(".chime-hero-description", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power4.out",
    });

    gsap.to(".chime-hero-buttons", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1,
      ease: "power4.out",
    });

    gsap.to(".chime-safety-panel", {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      delay: 1.5,
      ease: "power4.out",
    });

    // Avatar Scaling Animation (staggered animation)
    gsap.to(".chime-user-avatar", {
      opacity: 1,
      scale: 1,
      stagger: 0.2,
      duration: 1.5,
      delay: 2,
      ease: "power4.out",
    });

  }, []);
  return (
    <section className="chime-section chime-hero" id="hero">
      <div className="chime-container">
        <div className="chime-hero-grid">
          {/* Hero Content: Text and Buttons */}
          <div className="chime-hero-content">
            <div className="chime-hero-text">
              {/* Main Title: Informing users about the random video call feature */}
              <h1 className="chime-hero-title">
                Random <span className="chime-text-secondary">Video Calls</span>
              </h1>

              {/* Description: Briefly explaining how the matching system works */}
              <p className="chime-hero-description">
                Connect with random people through video calls. Our system matches you based on gender and location,
                with fallback to random matching if no exact matches are found.
                Choose your gender and start your connection now!
              </p>
            </div>

            {/* Button to start video chat */}
            <div className="chime-hero-buttons">
              <Button
                variant={Variant.primary}
                onClick={() => {
                  // Navigate to the video call page
                  if (isAuthenticated) {
                    // If user is authenticated then re-direct to the video-call page
                    location.href = "/video-calls";
                  } else {
                    // Other wise redirect to the login page
                    location.href = "/login";
                  }
                }}
                className="chime-start-btn"
              >
                Start Video Chat <FiArrowRight className="chime-button-icon" />
              </Button>
            </div>

            {/* Active Users Section: Displays the number of people online */}
            <div className="chime-hero-users">
              <div className="chime-user-avatars">
                {/* Placeholder avatars to represent active users */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="chime-user-avatar" />
                ))}
              </div>

              {/* Displays the number of online users */}
              <p className="chime-user-count">
                Join <span className="chime-text-highlight">12,000+</span> users online now
              </p>
            </div>
          </div>

          {/* Hero Visual: Contains safety features and statistics */}
          <div className="chime-hero-visual">
            {/* Safety Features Panel: Explains the current safety measures */}
            <div className="chime-safety-panel">
              <div className="chime-safety-header">
                {/* Safety Icon: Represents security features */}
                <FaShieldAlt className="chime-safety-icon" />
                {/* Safety Title */}
                <h3 className="chime-safety-title">Safety First</h3>
              </div>

              {/* List of Safety Features */}
              <div className="chime-safety-features">
                {/* Gender Matching Feature */}
                <div className="chime-safety-feature">
                  <div className="chime-safety-indicator chime-indicator-active"></div>
                  <div className="chime-safety-content">
                    <p className="chime-safety-label">Smart Gender Matching</p>
                    {/* Description: Matches users based on gender and age range */}
                    <p className="chime-safety-description">
                      When you enter the platform, our smart matching algorithm first attempts to match you with the opposite gender.
                      If no match is found with users within the same age range, the system will extend the search to any gender and any
                      age group. If there are still no available matches, the algorithm will fallback to connect you with someone from
                      another country.
                    </p>
                  </div>
                </div>

                {/* Report System Feature */}
                <div className="chime-safety-feature">
                  <div className="chime-safety-indicator chime-indicator-warning"></div>
                  <div className="chime-safety-content">
                    <p className="chime-safety-label">Report System</p>
                    {/* Description: A one-click reporting system for user safety */}
                    <p className="chime-safety-description">
                      Easily report any inappropriate behavior with just a click. Our team is available 24/7 to ensure any issues are
                      dealt with swiftly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Safety Statistics: Show effectiveness of safety features */}
              <div className="chime-safety-stats">
                <div className="chime-stat">
                  <span className="chime-stat-number">99.2%</span>
                  <span className="chime-stat-label">Safe Connections</span>
                </div>
                <div className="chime-stat">
                  <span className="chime-stat-number">24/7</span>
                  <span className="chime-stat-label">Moderation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
