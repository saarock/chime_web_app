// Import necessary libraries, hooks, styles, components, icons, and utilities
import React, { useCallback, useState } from "react";
import "../../styles/components/VideoTitle.css";
import Button from "../Button/Button";
import { Variant, type VideoTitleProps } from "../../types";
import { ChevronDown, MessageSquare } from "lucide-react";
import VideoFilters from "../VideoFilters/VideoFilters";
import { useAuth } from "../../hooks";
import ChimeUserInfoModal from "../ChimeUserInfoModal/ChimeUserInfoModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../apps/store";
import { addImportantDetails } from "../../features/auth/userSlice";
import { getCountry } from "../../utils";
import { toast } from "react-toastify";
import { FeedbackForm, FeedbackFormData } from "../FeedBackForm/FeedBackForm";
import { feedBackService } from "../../services";
import VideoErrorToast from "../VideoErrorToast/VideoErrorToast";
import Title from "./Title";
import VideoOnline from "./VideoOnline";
import VideoSuccessToast from "../VideoSuccessToast/VideoSuccessToast";

// Functional component to render the video chat title section with filters, feedback, and user info modals
const VideoTitle: React.FC<VideoTitleProps> = ({
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
  onlineUsersCount,
}) => {
  const [showFilters, setShowFilters] = useState(false); // Controls visibility of filter dropdown
  const { user } = useAuth(); // Custom hook to get authenticated user
  const [isHaveToFillDetails, setIsHaveToFillDetails] = useState<boolean>(false); // Show modal if required user info is missing
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatcher
  const [isUserWantToGiveFeedBack, setIsUserWantToGiveFeedBack] = useState<boolean>(false); // Toggle feedback form

  /**
   * Handles filter toggle visibility.
   * Checks if the user has completed mandatory info (age, gender, country).
   * If not, prompts modal to collect these details.
   */
  const handleToggleFilter = useCallback(() => {
    if (!user?.gender || !user.country || !user.age) {
      setIsHaveToFillDetails(true);
      return;
    }
    setShowFilters((prev) => !prev);
  }, [user]);

  /**
   * Handles submission of important user details (age, gender, country).
   * Uses IP-based country fetch and dispatches Redux action.
   */
  const handleSubmitAndAddImpDetails = useCallback(async (data: any) => {
    if (!user || !user?._id) {
      throw new Error("User id is required pleased refresh your page.");
    }

    const country = await getCountry.scanAndGet();
    if (!country) return;

    try {
      await dispatch(addImportantDetails({
        age: data.age,
        country: country,
        gender: data.gender,
        userId: user._id
      })).unwrap();
      toast.success("Details added successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [user?._id]);

  /**
   * Cancels feedback form display.
   * Closes feedback form if it's currently open.
   */
  const handleUserDonotWantToGivesFeedBakc = useCallback(() => {
    if (isUserWantToGiveFeedBack) {
      setIsUserWantToGiveFeedBack(false);
    }
  }, [isUserWantToGiveFeedBack]);

  /**
   * Submits user feedback to the server.
   * Associates the feedback with the current user.
   */
  const submitFeedBack = useCallback(async (feedBackFormData: FeedbackFormData) => {
    if (!user || !user?._id) {
      throw new Error("User id is required pleased refresh your page.");
    }

    feedBackFormData.userId = user._id;

    const data = await feedBackService.saveFeedBack(feedBackFormData); // Save the data 
    console.log(data);
    if (!data.isFeedbackSaved) {
      throw new Error("Failed to save the feedback pleased try agian");
    }
  }, [user]);

  return (
    <div className="chime-video-title-wrapper">
      {/* Modal to collect user info if not filled */}
      {isHaveToFillDetails && (
        <ChimeUserInfoModal
          isOpen={isHaveToFillDetails}
          onClose={() => setIsHaveToFillDetails(false)}
          onSubmit={handleSubmitAndAddImpDetails}
          key={"a"}
        />
      )}

      {/* Feedback form modal */}
      {isUserWantToGiveFeedBack && (
        <FeedbackForm
          onCancel={handleUserDonotWantToGivesFeedBakc}
          onSubmit={submitFeedBack}
        />
      )}

      {/* Main video chat title section */}
      <div className="chime-video-title-container">

        {/* Display error messages (left-aligned) */}
        <VideoErrorToast errorMessage={errorMessage} setErrorMessage={setErrorMessage} />

        {/* Centered title and action buttons */}
        <div className="chime-video-title-content">
          <Title />
          {/* Action buttons: online count, filter toggle, feedback */}
          <div className="chime-title-actions">

            <VideoOnline onlineUsersCount={onlineUsersCount} />

            <Button
              className='secondary'
              variant={Variant.secondary}
              onClick={() => handleToggleFilter()}
            >
              Filters
              <ChevronDown
                className={`chime-chevron ${showFilters ? "chime-chevron-up" : ""}`}
                size={16}
              />
            </Button>

            <Button
              className='secondary'
              variant={Variant.secondary}
              onClick={() => setIsUserWantToGiveFeedBack(true)}
            >
              Give feedback
              <MessageSquare size={16} />
            </Button>
          </div>
        </div>

        {/* Display success messages (right-aligned) */}
        <VideoSuccessToast setSuccessMessage={setSuccessMessage} successMessage={successMessage} />
      </div>

      {/* Filters dropdown section */}
      <VideoFilters showFilters={showFilters} />
    </div>
  );
};

export default VideoTitle;
