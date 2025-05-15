
// Import all the necessary dependencies heres
import type React from "react"
import { FiArrowRight } from "react-icons/fi"
import { JSX } from "react";
import "../../styles/components/CallToAction.css";




/**
 * // Chime call-to-action section
 * @returns {JSX.Element}
 */
const CallToAction: React.ComponentType = (): JSX.Element => {
  const handleGetStarted = (): void => {
    console.log("Get started clicked")
    // Add your logic here
  }

  return (
    <section className="chime-cta-section" id="cta">
      <div className="chime-cta-container">
        <div className="chime-cta-content">
          <h2 className="chime-cta-title">Ready for Fun and Connection?</h2>
          <p className="chime-cta-description">
            Join thousands of users who are already making new connections and enjoying entertainment experiences every
            day.
          </p>

          <button className="chime-cta-button" onClick={handleGetStarted}>
            Get Started Now <FiArrowRight />
          </button>

          <div className="chime-cta-stats">
            <div className="chime-cta-stat">
              <div className="chime-cta-stat-number">5,000+</div>
              <div className="chime-cta-stat-label">Active Users</div>
            </div>

            <div className="chime-cta-stat">
              <div className="chime-cta-stat-number">190+</div>
              <div className="chime-cta-stat-label">Countries</div>
            </div>

            <div className="chime-cta-stat">
              <div className="chime-cta-stat-number">24/7</div>
              <div className="chime-cta-stat-label">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
