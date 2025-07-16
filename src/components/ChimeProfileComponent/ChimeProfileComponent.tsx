// Import all necessary dependencies and components
import { Edit } from "lucide-react";
import { useAuth } from "../../hooks"; // Custom hook to get auth state
import { Variant } from "../../types"; // Enum for button variants
import Button from "../Button/Button";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ChimeUserInfoModal from "../ChimeUserInfoModal/ChimeUserInfoModal";
import { JSX, useState } from "react";

/**
 * ChimeProfileComponent
 * ---------------------
 * This component displays the authenticated user's profile details.
 * - If the user is still loading, it shows a loader.
 * - Once authenticated, it shows profile info like name, email, gender, etc.
 * - Includes a modal to update basic information (age, gender, country).
 *
 * Future Enhancements:
 * - Allow editing all profile fields (name, email, phone, etc.)
 * - Profile picture upload feature
 * - Add social media links or bio
 *
 * @returns {JSX.Element} The rendered profile UI for the logged-in user
 */
export const ChimeProfileComponent = (): JSX.Element => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // State to control visibility of user information modal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Show loading animation while auth state is being resolved
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      {/* If user is authenticated, render profile details */}
      {isAuthenticated && user && (
        <section className="chime-profile-section">
          {/* User info modal - shown conditionally via `isOpen` */}
          <ChimeUserInfoModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />

          {/* Edit button to open modal */}
          <Button
            variant={Variant.danger}
            className="chime-edit-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Edit Profile Info"
          >
            <Edit />
          </Button>

          <form className="chime-profile-child-container">
            {/* Profile header section */}
            <div className="chime-profile-header">
              <img
                src={user.profilePicture}
                alt="User Profile"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/29529706/2024/5/16/4db832c7-d67c-46bd-9599-fa167eb61e8b1715800226613SoftToysandDolls1.jpg";
                }}
                className="chime-profile-image"
              />
              <h2 className="chime-profile-name">{user.fullName}</h2>
              <p className="chime-user-name">@{user?.userName || "Unknown"}</p>

              {/* Active status label */}
              <span
                className={`chime-profile-status ${user.active ? "active" : "inactive"}`}
              >
                {user.active ? "Active" : "Inactive"}
              </span>
            </div>

            {/* User details table */}
            <div className="chime-profile-details">
              <table className="chime-profile-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Email:</strong>
                    </td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Phone:</strong>
                    </td>
                    <td>{user.phoneNumber || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Age:</strong>
                    </td>
                    <td>{user.age || "Not specified"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Gender:</strong>
                    </td>
                    <td>{user.gender || "Not specified"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Country:</strong>
                    </td>
                    <td>{user.country || "Not specified"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Relationship Status:</strong>
                    </td>
                    <td>
                      {user.relationShipStatus
                        ? user.relationShipStatus
                        : "Not-Specified"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Role:</strong>
                    </td>
                    <td>{user.role || "User"}</td>
                  </tr>
                  {user.role === "admin" && (
                    <tr>
                      <td>
                        <strong>Password:</strong>
                      </td>
                      <td>{user.password || "For admin password is required!"}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default ChimeProfileComponent;
