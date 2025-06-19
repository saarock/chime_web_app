// Import all the necessary
import "../../styles/components/ProfileHeader.css";
import { FaUser } from "react-icons/fa";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import { useNavigate } from "react-router-dom";
import { JSX } from "react";
import { useAuth } from "../../hooks";

/**
 * Chime profile nav container with many navs like -Profile -Setting -and Logout
 * @returns {JSX.Element}
 */
const ProfileHeader: React.ComponentType = (): JSX.Element => {
  // hooks goes here
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();


  // chime container navs
  const navItems = [
    {
      name: "Profile",
      icon: <FaUser />,
      classSuffix: "profile",
    },
  ];

  return (
    <div className="chime-profile-header-container">
      <ul className="chime-profile-header-navs">
        {navItems.map((item) => (
          <li
            key={item.name}
            className={`chime-profile-header-navs-item chime-${item.classSuffix}`}
            onClick={() => navigate(item.name.toLowerCase())}
          >
            <span className="chime-profile-header-navs-icon">{item.icon}</span>
            <span className="chime-profile-header-navs-text">{item.name}</span>
          </li>
        ))}
        {/* Chime container logout nav independenet nav to logout the user from the both the server side and client side */}
        {/* Only load the logout component when user get verified */}
        {isAuthenticated && <LogoutComponent />}
      </ul>
    </div>
  );
};

export default ProfileHeader;
