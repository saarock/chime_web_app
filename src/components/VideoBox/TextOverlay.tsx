
import { Heart } from "lucide-react";
import "../../styles/components/TextOverLay.css";

interface TestOverlayProps {
  connectedTo?: string
}

export function TestOverlay({ connectedTo }: TestOverlayProps) {
  return (
    <div className="chime-overlay-wrapper">
      <div className="chime-overlay-backdrop">
        <div className="chime-overlay-container">
          {/* Animated background elements */}
          <div className="chime-overlay-bg-circle chime-overlay-bg-circle-1"></div>
          <div className="chime-overlay-bg-circle chime-overlay-bg-circle-2"></div>
          <div className="chime-overlay-bg-circle chime-overlay-bg-circle-3"></div>

          {/* Main content */}
          <div className="chime-overlay-content">
            <div className="chime-overlay-heart-container">
              <div className="chime-overlay-heart-glow"></div>
              <Heart className="chime-overlay-heart-icon" size={48} />
              <div className="chime-overlay-heart-pulse"></div>
            </div>

            <div className="chime-overlay-text-section">

              <div className="chime-overlay-message">
                <span className="chime-overlay-emoji">💬</span>
                <p className="chime-overlay-message-text">Sparks are flying! Get ready for a flirty chat!</p>
                <span className="chime-overlay-emoji">💫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
