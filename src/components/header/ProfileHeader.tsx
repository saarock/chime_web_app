import "../../styles/index";
import { FaCog, FaUser } from "react-icons/fa";
import LogoutComponent from "../logoutComponent/LogoutComponent";

const navItems = [
  {
    name: "Setting",
    icon: <FaCog />,
    classSuffix: "setting",
  },
  {
    name: "Profile",
    icon: <FaUser />,
    classSuffix: "profile",
  },
];

const ProfileHeader = () => {
  return (
    <div className="chime-profile-header-container">
      <ul className="chime-profile-header-navs">
        {navItems.map((item) => (
          <li key={item.name} className={`chime-profile-header-navs-item chime-${item.classSuffix}`}>
            <span className="chime-profile-header-navs-icon">{item.icon}</span>
            <span className="chime-profile-header-navs-text">{item.name}</span>
          </li>
        ))}
        <LogoutComponent />
      </ul>
    </div>
  );
};

export default ProfileHeader;
