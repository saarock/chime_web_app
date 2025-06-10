// Import all the necessary dependencies
import type React from "react";
import {
  FaRandom,
  FaVideo,
  FaShieldAlt,
} from "react-icons/fa";
import { JSX } from "react";
import { FeatureCardProps } from "../../types";
import "../../styles/components/FeatureSection.css";
import ChimiSectionsHowHeader from "../ChimeSectionsHowHeader/ChimiSectionsHowHeader";

/**
 * Chime featureCard component that can be used to showcase new features for users
 * @param {React.ReactNode} param0.icon - Icon for the feature
 * @param {string} param0.iconType - Defines icon type [primary | secondary]
 * @param {string} param0.title - Title of the feature card
 * @param {string} param0.description - Description for the feature card
 * @returns {JSX.Element}
 */
const FeatureCard: React.ComponentType<FeatureCardProps> = ({
  icon,
  iconType,
  title,
  description,
}): JSX.Element => {
  return (
    <div className="chime-feature-card">
      <div className={`chime-feature-icon chime-feature-icon-${iconType}`}>
        {icon}
      </div>
      <h3 className="chime-feature-card-title">{title}</h3>
      <p className="chime-feature-card-description">{description}</p>
    </div>
  );
};

/**
 * Chime feature section
 * @returns {JSX.Element}
 */
const FeatureSection: React.ComponentType = (): JSX.Element => {
  return (
    <section className="chime-feature-section" id="features">
      <div className="chime-feature-container">
        <ChimiSectionsHowHeader
          title={"Explore the Features That Make Chime Unique!"}
          description="Discover everything Chime offers, from random video chats to global connections and entertainment. Your next adventure starts here!"
        />

        <div className="chime-feature-grid">
          <FeatureCard
            icon={<FaRandom />}
            iconType="primary"
            title="Random Video Chats"
            description="Meet new people through spontaneous, random video calls. If you’re not feeling the vibe, just skip to the next one!"
          />

          <FeatureCard
            icon={<FaVideo />}
            iconType="secondary"
            title="High-Definition Video"
            description="Enjoy HD video quality that adapts to your connection speed, providing smooth calls no matter where you are."
          />
          <FeatureCard
            icon={<FaShieldAlt />}
            iconType="primary"
            title="Safety at the Core"
            description="With real-time reporting and 24/7 moderation, Chime ensures a secure and respectful space for all users."
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
