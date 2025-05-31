import type React from "react"
// Import all the necessary dependencies
import { FiArrowRight } from "react-icons/fi"
import {
  FaVideo,
  FaMicrophone,
  FaTimes,
  FaRandom,
  FaUsers,
  FaShieldAlt,
  FaFilter,
  FaMale,
  FaFemale,
} from "react-icons/fa"
import type { JSX } from "react"
import "../../styles/components/HeroSection.css"


/**
 * Chime hero section component for random video calls with filters
 * @returns {JSX.Element}
 */
const HeroSection: React.ComponentType = (): JSX.Element => {
  return (
    <section className="chime-section chime-hero" id="hero">
      <div className="chime-container">
        <div className="chime-hero-grid">
          <div className="chime-hero-content">
            <div className="chime-hero-text">
              <h1 className="chime-hero-title">
                Random Video Calls with <span className="chime-text-secondary">Smart Filters</span>
              </h1>
              <p className="chime-hero-description">
                Connect instantly with people worldwide through random video calls. Use gender filters, strict mode, and
                safety features to find the perfect conversation partner.
              </p>
            </div>
            <div className="chime-hero-buttons">
              <button className="chime-button chime-button-primary chime-button-large">
                Start Video Chat <FiArrowRight className="chime-button-icon" />
              </button>
              <button className="chime-button chime-button-secondary chime-button-large">Browse Filters</button>
            </div>
            <div className="chime-hero-features">
              <div className="chime-feature-item">
                <FaFilter className="chime-feature-icon" />
                <span>Gender Filters</span>
              </div>
              <div className="chime-feature-item">
                <FaShieldAlt className="chime-feature-icon" />
                <span>Strict Mode</span>
              </div>
              <div className="chime-feature-item">
                <FaVideo className="chime-feature-icon" />
                <span>HD Video</span>
              </div>
            </div>
            <div className="chime-hero-users">
              <div className="chime-user-avatars">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="chime-user-avatar" />
                ))}
              </div>
              <p className="chime-user-count">
                Join <span className="chime-text-highlight">12,000+</span> users online now
              </p>
            </div>
          </div>

          <div className="chime-hero-visual">
            {/* Video Chat Interface */}
            <div className="chime-video-chat">
              <div className="chime-video-status">
                <div className="chime-status-indicator"></div>
                Random Video Chat • Online: 2,847
              </div>

              {/* Filter Panel */}
              <div className="chime-filter-panel">
                <div className="chime-filter-title">
                  <FaFilter className="chime-filter-icon" />
                  Filters
                </div>
                <div className="chime-filter-options">
                  <button className="chime-filter-btn chime-filter-active">
                    <FaMale /> Male
                  </button>
                  <button className="chime-filter-btn">
                    <FaFemale /> Female
                  </button>
                  <button className="chime-filter-btn chime-filter-strict">
                    <FaShieldAlt /> Strict Mode
                  </button>
                </div>
              </div>

              {/* Random User */}
              <div className="chime-video-user">
                <div className="chime-user-placeholder">
                  <FaUsers className="chime-user-icon" />
                  <p>Looking for someone...</p>
                </div>
              </div>

              {/* Controls */}
              <div className="chime-video-controls">
                <button className="chime-control-button chime-control-secondary">
                  <FaMicrophone />
                </button>
                <button className="chime-control-button chime-control-secondary">
                  <FaVideo />
                </button>
                <button className="chime-control-button chime-control-danger">
                  <FaTimes />
                </button>
                <button className="chime-control-button chime-control-primary">
                  <FaRandom />
                </button>
              </div>
            </div>

            {/* Safety Features Panel */}
            <div className="chime-safety-panel">
              <div className="chime-safety-header">
                <FaShieldAlt className="chime-safety-icon" />
                <h3 className="chime-safety-title">Safety First</h3>
              </div>

              <div className="chime-safety-features">
                <div className="chime-safety-feature">
                  <div className="chime-safety-indicator chime-indicator-active"></div>
                  <div className="chime-safety-content">
                    <p className="chime-safety-label">Strict Mode</p>
                    <p className="chime-safety-description">Enhanced content filtering</p>
                  </div>
                </div>

                <div className="chime-safety-feature">
                  <div className="chime-safety-indicator chime-indicator-active"></div>
                  <div className="chime-safety-content">
                    <p className="chime-safety-label">Gender Filter</p>
                    <p className="chime-safety-description">Male connections only</p>
                  </div>
                </div>

                <div className="chime-safety-feature">
                  <div className="chime-safety-indicator chime-indicator-warning"></div>
                  <div className="chime-safety-content">
                    <p className="chime-safety-label">Report System</p>
                    <p className="chime-safety-description">One-click reporting</p>
                  </div>
                </div>
              </div>

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
  )
}

export default HeroSection
