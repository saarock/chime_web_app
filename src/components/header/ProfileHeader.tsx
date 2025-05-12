import "../../styles/index";
import { FaCog, FaUser } from "react-icons/fa";
import LogoutComponent from "../logoutComponent/LogoutComponent";
import { useNavigate } from "react-router-dom";



const ProfileHeader = () => {

  const navigate = useNavigate();


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

  return (
    <div className="chime-profile-header-container">
      <ul className="chime-profile-header-navs">
        {navItems.map((item) => (
          <li key={item.name} className={`chime-profile-header-navs-item chime-${item.classSuffix}`} onClick={() => navigate(item.name.toLowerCase())}>
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
