// Import all the necessary
import "../../styles/components/ProfileHeader.css";
import { FaUser } from "react-icons/fa";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import { useNavigate } from "react-router-dom";
import { JSX } from "react";
import { useAuth } from "../../hooks";
import { ShieldCheck } from "lucide-react";

/**
 * Chime profile nav container with many navs like -Profile -Setting -and Logout
 * @returns {JSX.Element}
 */
const ProfileHeader: React.ComponentType = (): JSX.Element => {
  // hooks goes here
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();


  // chime container navs
  const navItems = [
    {
      path: "profile",
      name: "Profile",
      icon: <FaUser />,
      classSuffix: "profile",
      canIShow: true,
      redirectToAnotherWeb: false
    },
    {
      path: "http://localhost:8000/admin/dashboard",
      name: "admin Dashboard",
      icon: <ShieldCheck />,
      canIShow: isAuthenticated && user?.role == "admin",
      classSuffix: "profile",
      redirectToAnotherWeb: true,
    },
  ];

  return (
    <div className="chime-profile-header-container">
      <ul className="chime-profile-header-navs">
        {navItems.map((item) => (
          item.canIShow && <li
            key={item.name}
            className={`chime-profile-header-navs-item chime-${item.classSuffix}`}
            onClick={() => {
              if (item.redirectToAnotherWeb) {
                window.location.href = item.path;
              } else {
                navigate(item.path)
              }
            }}
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
