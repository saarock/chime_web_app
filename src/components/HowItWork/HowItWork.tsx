// Import all the necessary dependencies here
import type React from "react"
import { FiUserPlus, FiUsers, FiVideo } from "react-icons/fi"
import { JSX } from "react"
import "../../styles/components/HowItWorks.css";
import { StepCardProps } from "../../types";
import ChimiSectionsHowHeader from "../ChimeSectionsHowHeader/ChimiSectionsHowHeader";



const StepCard: React.ComponentType<StepCardProps> = ({ number, icon, iconType, title, description }): JSX.Element => {
  return (
    <div className="chime-step-card">
      <div className="chime-step-number">{number}</div>
      <div className={`chime-step-icon chime-step-icon-${iconType}`}>{icon}</div>
      <h3 className="chime-step-title">{title}</h3>
      <p className="chime-step-description">{description}</p>
    </div>
  )
}


/**
 * // Component to show the details that how the chime work
 * @returns {JSX.Element}
 */
const HowItWorks: React.ComponentType = (): JSX.Element => {
  return (
    <section className="chime-how-it-works" id="how-it-works">
      <div className="chime-how-container">

        <ChimiSectionsHowHeader title={"How to use chime"} description={"Pleased follow the instructions given below"} />
        <div className="chime-steps-container">
          <StepCard
            number={1}
            icon={<FiUserPlus />}
            iconType="primary"
            title="Create Your Account"
            description="Sign up with your email or social media accounts and set up your profile with your entertainment preferences and interests."
          />

          <StepCard
            number={2}
            icon={<FiUsers />}
            iconType="secondary"
            title="Choose Your Mode"
            description="Select between random video chats or join an entertainment group based on your interests like gaming, movies, or music."
          />

          <StepCard
            number={3}
            icon={<FiVideo />}
            iconType="primary"
            title="Start Connecting"
            description="Allow camera access and start meeting new people from around the world instantly. Join games, watch parties, and more!"
          />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
