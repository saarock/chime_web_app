// Import all the necessary dependencies
import { FiArrowRight } from "react-icons/fi";
import {
  FaVideo,
  FaMicrophone,
  FaTimes,
  FaRandom,
  FaUsers,
} from "react-icons/fa";
import { JSX } from "react";
import "../../styles/components/HeroSection.css";

/**
 * Chime hero section component
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
                Random Video Chats &{" "}
                <span className="chime-text-secondary">
                  Group Conversations
                </span>
              </h1>
              <p className="chime-hero-description">
                Connect with strangers worldwide through random video chats or
                join group conversations with people who share your interests.
              </p>
            </div>
            <div className="chime-hero-buttons">
              <button className="chime-button chime-button-primary chime-button-large">
                Start Chatting <FiArrowRight className="chime-button-icon" />
              </button>
              <button className="chime-button chime-button-secondary chime-button-large">
                Create Profile
              </button>
            </div>
            <div className="chime-hero-users">
              <div className="chime-user-avatars">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="chime-user-avatar" />
                ))}
              </div>
              <p className="chime-user-count">
                Join <span className="chime-text-highlight">5,000+</span> users
                already connected
              </p>
            </div>
          </div>

          <div className="chime-hero-visual">
            {/* Video Chat Interface */}
            <div className="chime-video-chat">
              <div className="chime-video-status">
                <div className="chime-status-indicator"></div>
                Random Chat • Online: 1,243
              </div>

              {/* Random User */}
              <div className="chime-video-user">
                <FaUsers className="chime-user-icon" />
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

            {/* Group Chat Window */}
            <div className="chime-group-chat">
              <div className="chime-group-header">
                <div className="chime-group-title">
                  <FaUsers className="chime-group-icon" />
                  <h3 className="chime-group-name">Travel Enthusiasts</h3>
                </div>
                <div className="chime-group-status">24 online</div>
              </div>

              <div className="chime-chat-messages">
                <div className="chime-chat-message">
                  <div className="chime-message-avatar chime-avatar-primary">
                    J
                  </div>
                  <div className="chime-message-content">
                    <p className="chime-message-author chime-text-primary">
                      Jake
                    </p>
                    <p className="chime-message-text">
                      Has anyone been to Bali recently?
                    </p>
                  </div>
                </div>

                <div className="chime-chat-message">
                  <div className="chime-message-avatar chime-avatar-secondary">
                    S
                  </div>
                  <div className="chime-message-content">
                    <p className="chime-message-author chime-text-secondary">
                      Sarah
                    </p>
                    <p className="chime-message-text">
                      I was there last month! The beaches are amazing.
                    </p>
                  </div>
                </div>

                <div className="chime-chat-message">
                  <div className="chime-message-avatar chime-avatar-neutral">
                    M
                  </div>
                  <div className="chime-message-content">
                    <p className="chime-message-author chime-text-primary">
                      Mike
                    </p>
                    <p className="chime-message-text">
                      I'm planning to go in December. Any recommendations?
                    </p>
                  </div>
                </div>
              </div>

              <div className="chime-chat-input-container">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="chime-chat-input"
                />
                <button className="chime-chat-send">
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
