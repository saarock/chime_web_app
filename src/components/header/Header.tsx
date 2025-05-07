import React, { useMemo } from 'react';
import { NavLink } from 'react-router';
import { useAuth } from '../../hooks';
import "../../styles";
import logo from "../../assets/images/logo.png";
import { localStorageUtil } from '../../utils';
import { LOCAL_STORAGE_USER_DATA_KEY } from '../../constant';

// Import icons from react-icons
import { FaHome, FaPhoneAlt, FaSignInAlt, FaUserPlus, FaComments, FaVideo } from 'react-icons/fa';
import SearchComponent from '../searchComponent/searchComponent';

const Header = () => {

  const { isAuthenticated } = useAuth();
  const localStorageUtilCache = useMemo(() => localStorageUtil, []);

  const navs = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
      isProtected: !isAuthenticated && !localStorageUtilCache.checkItem(LOCAL_STORAGE_USER_DATA_KEY),
      className: "",
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <FaPhoneAlt />,
      isProtected: !isAuthenticated && !localStorageUtilCache.checkItem(LOCAL_STORAGE_USER_DATA_KEY),
      className: "",
    },
    {
      path: "/login",
      name: "Login",
      icon: <FaSignInAlt />,
      isProtected: !isAuthenticated && !localStorageUtilCache.checkItem(LOCAL_STORAGE_USER_DATA_KEY),
      className: "chime-btn-primary",
    },
    {
      path: "/register",
      name: "Register",
      icon: <FaUserPlus />,
      isProtected: !isAuthenticated && !localStorageUtilCache.checkItem(LOCAL_STORAGE_USER_DATA_KEY),
      className: "chime-btn-ternary",
    },
    {
      path: "/chats",
      name: "Chats",
      icon: <FaComments />,
      isProtected: isAuthenticated || localStorageUtilCache.checkItem(LOCAL_STORAGE_USER_DATA_KEY),
      className: "",
    },
    {
      path: "/video-calls",
      name: "Video",
      icon: <FaVideo />,
      isProtected: isAuthenticated || localStorageUtilCache.checkItem(LOCAL_STORAGE_USER_DATA_KEY),
      className: "",
    }
  ];

  return (
    <header className='chime-header'>
      <nav className='chime-header-navbar'>
        <ul className='chime-header-navbar-logos'>
          <li className='chime-header-navbar-logo'>
            <img src={logo} alt="logo" className='chime-header-navbar-logo-image' />
          </li>
        </ul>

        {
          (isAuthenticated || localStorageUtilCache.checkItem(LOCAL_STORAGE_USER_DATA_KEY) )&& <div className='chime-header-nav-search-bar'>
            <SearchComponent />
          </div>
        }
        <ul className='chime-header-navbar-navs'>
          {navs.map((currentNav) =>
            currentNav.isProtected === true ? (
              <li key={currentNav.name} className={`chime-header-navbar-navs-nav ${currentNav.className}`}>
                <NavLink to={currentNav.path} className={`chime-header-navbar-navs-nav-link`}>
                  <span className="chime-header-navbar-navs-nav-icon">{currentNav.icon}</span>
                  <span>{currentNav.name}</span>
                </NavLink>
              </li>
            ) : null
          )}
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);
