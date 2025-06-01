// Import all the necessary dependencies here 
import React, { useCallback, useState } from "react"
import "../../styles/components/VideoTitle.css"
import Button from "../Button/Button"
import { Variant, type VideoTitleProps } from "../../types";
import { ChevronDown, Plus, Users } from "lucide-react"
import VideoFilters from "../VideoFilters/VideoFilters";
import { useAuth } from "../../hooks";
import ChimeUserInfoModal from "../ChimeUserInfoModal/ChimeUserInfoModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../apps/store";
import { addImportantDetails } from "../../features/auth/userSlice";
import { getCountry } from "../../utils";
import { toast } from "react-toastify";

const VideoTitle: React.FC<VideoTitleProps> = ({
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
  onlineUsersCount,
}) => {
  const [showFilters, setShowFilters] = React.useState(false);
  const { user } = useAuth();
  const [isHaveToFillDetails, setIsHaveToFillDetails] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Function that helps to check the important details [country, age, gender] 
   */

  const handleToggleFilter = useCallback(() => {
    if (!user?.gender || !user.country || !user.age) {
      setIsHaveToFillDetails(true);
      return;
    }
    setShowFilters((prev) => !prev);
  }, [user]);



  const handleSubmitAndAddImpDetails = useCallback(async (data: any) => {

    if (!user?._id) return;
    const country = await getCountry.scanAndGet();
    if (!country) {
      return;
    }

    try {
      await dispatch(addImportantDetails({
        age: data.age,
        country: country,
        gender: data.gender,
        userId: user._id
      })).unwrap();
      toast.success("Details added successfully.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }

  }, [user?._id]);


  return (
    <div className="chime-video-title-wrapper">
      {isHaveToFillDetails && <ChimeUserInfoModal isOpen={isHaveToFillDetails} onClose={() => setIsHaveToFillDetails(false)} onSubmit={handleSubmitAndAddImpDetails} key={"a"} />}
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

            <Button className='secondary' variant={Variant.secondary} onClick={() => handleToggleFilter()}>
              Filters
              <ChevronDown className={`chime-chevron ${showFilters ? "chime-chevron-up" : ""}`} size={16} />
            </Button>
            <Button className='secondary' variant={Variant.secondary} onClick={() => setIsHaveToFillDetails(true)}>
              Change details
              <Plus size={16} />
            </Button>

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

      <VideoFilters showFilters={showFilters} />

    </div>
  )
}

export default VideoTitle
