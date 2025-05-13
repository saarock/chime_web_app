// Import all the necessary dependencies here
import { lazy, Suspense, useCallback, useEffect, useMemo, useReducer } from 'react';
import { useAuth } from '../../hooks';
import "../../styles";
import logo from "../../assets/images/logo.png";
import { localStorageUtil } from '../../utils';
import { LOCAL_STORAGE_USER_DATA_KEY } from '../../constant';
import { FaHome, FaPhoneAlt, FaSignInAlt, FaUserPlus, FaComments, FaVideo, } from 'react-icons/fa';
import { IoIosNotifications } from "react-icons/io";
import SearchComponent from '../searchComponent/SearchComponent';
import { CiSearch } from "react-icons/ci";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { tabInitialState, tabReducer } from '../../reducers';
import { User } from '../../types';

// Laxy imports goes here
const ProfileHeader = lazy(() => import("./ProfileHeader"));



const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const localStorageUtilCacheUserData = useMemo(() => localStorageUtil.checkItem<boolean>(LOCAL_STORAGE_USER_DATA_KEY), [location.pathname, navigate]);
  const { user, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(tabReducer, tabInitialState);


  /**
   * function to open the tab means to show all the navs after clicking the navWithImage
   */
  const openTab = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    if (state.openTabs.includes("0")) {
      dispatch({ type: "CLOSE_TAB", payload: "0" });
    } else {
      dispatch({ type: "OPEN_TAB", payload: "0" });
    }
  }, [state.openTabs, dispatch]);



  // remove all the tabs one by one 
  const removeAllTheTabsOneByOne = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CLOSE_ALL_TABS_ONE_BY_ONE"
    });
  }, []);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      removeAllTheTabsOneByOne(e);
    };

    // Add event listener
    document.body.addEventListener("click", handleClick);

    // Cleanup function to remove event listener
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);





  const navs = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
      isProtected: !isAuthenticated && !localStorageUtilCacheUserData,
      className: "chime-just-link",
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <FaPhoneAlt />,
      isProtected: !isAuthenticated && !localStorageUtilCacheUserData,
      className: "chime-just-link",

    },
    {
      path: "/login",
      name: "Login",
      icon: <FaSignInAlt />,
      isProtected: !isAuthenticated && !localStorageUtilCacheUserData,
      className: "chime-btn chime-btn-primary",
    },
    {
      path: "/register",
      name: "Register",
      icon: <FaUserPlus />,
      isProtected: !isAuthenticated && !localStorageUtilCacheUserData,
      className: "chime-btn chime-btn-ternary",
    },
    {
      path: "/chats",
      name: "Chats",
      icon: <FaComments />,
      isProtected: isAuthenticated || localStorageUtilCacheUserData,
      className: "chime-just-link",

    },
    {
      path: "/video-calls",
      name: "Video",
      icon: <FaVideo />,
      isProtected: isAuthenticated || localStorageUtilCacheUserData,
      className: "chime-just-link",

    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: <IoIosNotifications />,
      isProtected: isAuthenticated || localStorageUtilCacheUserData,
      className: "chime-just-link",

    }
  ];


  const navsWithImage = [
    {
      path: "/profile",
      name: "Profile",
      imageURL: isAuthenticated ? user?.profilePicture : "",
      isProtected: isAuthenticated || localStorageUtilCacheUserData,
      className: "",
    }
  ]


  return (
    <header className='chime-header'>
      <nav className='chime-header-navbar'>
        <NavLink to="/">
          <ul className='chime-header-navbar-logos'>
            <li className='chime-header-navbar-logo'>
              <img src={logo} alt="logo" className='chime-header-navbar-logo-image' />
            </li>
            <li className='chime-header-navbar-logo-text'>
              Chime
            </li>
          </ul>
        </NavLink>


        {
          (isAuthenticated || localStorageUtilCacheUserData) && <div className='chime-header-nav-search-bar'>
            <SearchComponent />
            <span className="chime-header-nav-search-bar-icon">{<CiSearch />}</span>
          </div>

        }


        <ul className='chime-header-navbar-navs'>
          {
            navs.map((currentNav) =>
              currentNav.isProtected === true ? (
                <li key={currentNav.name} className={`chime-header-navbar-navs-nav ${currentNav.className}`}>
                  <NavLink to={currentNav.path} className={`chime-header-navbar-navs-nav-link`}>
                    <span className="chime-header-navbar-navs-nav-icon">{currentNav.icon}</span>
                    <span>{currentNav.name}</span>
                  </NavLink>
                </li>
              ) : null
            )
          }

          {
            navsWithImage.map((currentNav) => {
              const safeImageURL = currentNav.imageURL?.trim();
              if ((isAuthenticated && user) || localStorageUtilCacheUserData) {
                return (
                  <li key={currentNav.name} className='chime-header-navbar-navs-profile' onClick={(e) => openTab(e)}>
                    <img
                      src={safeImageURL}
                      alt={`${currentNav.name}`}
                      className='chime-header-navbar-navs-nav-profile-nav'
                      onError={(e) => {
                        e.currentTarget.src = "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/29529706/2024/5/16/4db832c7-d67c-46bd-9599-fa167eb61e8b1715800226613SoftToysandDolls1.jpg";
                      }}
                    />
                  </li>
                );
              }
              return null;
            })
          }


          {
            state.openTabs.length >= 0 && state.openTabs.map((tabId) => (
              tabId === "0" && (
                <div className='chime-profile-nav-fallback-container' key={tabId} onClick={(e) => e.stopPropagation()}>
                  <Suspense fallback="loading...">
                    <ProfileHeader />
                  </Suspense>
                </div>
              )
            ))
          }

        </ul>


      </nav>
    </header>
  );
};

export default Header;
