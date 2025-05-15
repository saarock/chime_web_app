// Import all the necessary dependencies
import type React from "react"
import { FaRandom, FaUsers, FaUserCircle, FaVideo, FaShieldAlt, FaGlobe } from "react-icons/fa"
import { JSX } from "react"
import { FeatureCardProps } from "../../types";
import "../../styles/components/FeatureSection.css";
import ChimiSectionsHowHeader from "../ChimeSectionsHowHeader/ChimiSectionsHowHeader";



/**
 * Chime featureCard component that can be use to show new feature for users 
 * @param {React.ReactNode} param0.icon - Icon 
 * @param {string} param0.iconType - define icon type [ primary | secondary ]
 * @param {string} param0.title - define the title of the feature card
 * @param {string} param0.description - define the description for the feature card
 * @returns {JSX.Element} 
 */
const FeatureCard: React.ComponentType<FeatureCardProps> = ({ icon, iconType, title, description }): JSX.Element => {
  return (
    <div className="chime-feature-card">
      <div className={`chime-feature-icon chime-feature-icon-${iconType}`}>{icon}</div>
      <h3 className="chime-feature-card-title">{title}</h3>
      <p className="chime-feature-card-description">{description}</p>
    </div>
  )
}

/**
 * Chime feature section
 * @returns {JSX.Element}
 */
const FeatureSection: React.ComponentType = (): JSX.Element => {
  return (
    <section className="chime-feature-section" id="features">
      <div className="chime-feature-container">


        <ChimiSectionsHowHeader title={"Discover Our Features"} description="Our platform offers everything you need to connect with new people and have meaningful conversations.
            Explore entertainment options and make new friends worldwide" />


        <div className="chime-feature-grid">
          <FeatureCard
            icon={<FaRandom />}
            iconType="primary"
            title="Random Video Chats"
            description="Connect with random people worldwide through our video chat system. Skip to the next person with a single click."
          />
          <FeatureCard
            icon={<FaUsers />}
            iconType="secondary"
            title="Group Entertainment"
            description="Join topic-based entertainment groups with up to 20 participants. Play games, watch videos, and share experiences together."
          />
          <FeatureCard
            icon={<FaUserCircle />}
            iconType="primary"
            title="User Profiles"
            description="Create your personalized profile to showcase your interests and connect with like-minded people who share your entertainment preferences."
          />
          <FeatureCard
            icon={<FaVideo />}
            iconType="secondary"
            title="HD Video Quality"
            description="Enjoy crystal clear video with adaptive quality to ensure smooth calls even with unstable connections for the best entertainment experience."
          />
          <FeatureCard
            icon={<FaShieldAlt />}
            iconType="primary"
            title="Safety Features"
            description="Report inappropriate behavior instantly. Our moderation team works 24/7 to keep the platform safe for all users."
          />
          <FeatureCard
            icon={<FaGlobe />}
            iconType="secondary"
            title="Global Community"
            description="Connect with people from over 190 countries and enjoy entertainment with diverse cultural perspectives and experiences."
          />
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
