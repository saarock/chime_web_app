// Import all the necessary dependencies here 
import React from "react"
import "../../styles/components/VideoTitle.css"
import Button from "../Button/Button"
import type { VideoTitleProps } from "../../types";
import { ChevronDown, Globe, Calendar, Users } from "lucide-react"

const VideoTitle: React.FC<VideoTitleProps> = ({
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
  onlineUsersCount,
}) => {
  const [showFilters, setShowFilters] = React.useState(false)

  return (
    <div className="chime-video-title-wrapper">
      <div className="chime-video-title-container">
        {/* Left error message */}
        <div className="chime-message chime-message-left">
          {errorMessage && (
            <div className="chime-alert chime-error">
              <span className="chime-alert-icon" aria-hidden="true">
                ⚠️
              </span>
              <span>{errorMessage}</span>
              <Button
                onClick={() => setErrorMessage(null)}
                className="chime-alert-remove"
                aria-label="Dismiss error message"
              >
                ×
              </Button>
            </div>
          )}
        </div>

        {/* Center title */}
        <div className="chime-video-title-content">
          <h1 className="chime-video-title-heading">
            <span className="chime-title-emoji">🎥</span>
            Random Video Chat
          </h1>

          <div className="chime-title-actions">
            <div className="chime-online-indicator">
              <span className="chime-online-dot"></span>
              <span className="chime-online-count">
                <Users size={14} />
                {onlineUsersCount} online
              </span>
            </div>

            <button className="chime-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              Filters
              <ChevronDown className={`chime-chevron ${showFilters ? "chime-chevron-up" : ""}`} size={16} />
            </button>
          </div>
        </div>

        {/* Right success message */}
        <div className="chime-message chime-message-right">
          {successMessage && (
            <div className="chime-alert chime-success">
              <span className="chime-alert-icon" aria-hidden="true">
                ✔️
              </span>
              <span>{successMessage}</span>
              <Button
                onClick={() => setSuccessMessage(null)}
                className="chime-alert-remove"
                aria-label="Dismiss success message"
              >
                ×
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      <div className={`chime-filter-panel ${showFilters ? "chime-filter-panel-visible" : ""}`}>
        <div className="chime-filter-content">
          <div className="chime-filter-group">
            <label className="chime-filter-label">
              <Globe size={16} className="chime-filter-icon" />
              Country
            </label>
            <select className="chime-filter-select">
              <option value="any">Any Country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
              <option value="jp">Japan</option>
              <option value="br">Brazil</option>
              <option value="in">India</option>
            </select>
          </div>

          <div className="chime-filter-group">
            <label className="chime-filter-label">
              <Calendar size={16} className="chime-filter-icon" />
              Age Range
            </label>
            <select className="chime-filter-select">
              <option value="any">Any Age</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46-55">46-55</option>
              <option value="55+">55+</option>
            </select>
          </div>

          <div className="chime-filter-group">
            <label className="chime-filter-label">
              <Users size={16} className="chime-filter-icon" />
              Gender
            </label>
            <select className="chime-filter-select">
              <option value="any">Any Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="chime-filter-actions">
            <button className="chime-filter-reset">Reset</button>
            <button className="chime-filter-apply">Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoTitle
