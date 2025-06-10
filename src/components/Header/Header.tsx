// Import all the necessary dependencies here
import React, {
  JSX,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useAuth } from "../../hooks";
import { localStorageUtil } from "../../utils";
import { LOCAL_STORAGE_USER_DATA_KEY } from "../../constant";
import {
  FaHome,
  FaPhoneAlt,
  FaUserPlus,
  FaVideo,
} from "react-icons/fa";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { tabInitialState, tabReducer } from "../../reducers";
import "../../styles/components/Header.css";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import NepalFlagVersion from "../NepalFlagVersion/NepalFlagVersion";
import { ChimeTalkLogo} from "../ChimeTalkLogo/ChimiTalkLogo";

// Laxy imports goes here
const ProfileHeader = lazy(() => import("./ProfileHeader"));

/**
 * Chime main header component to show all the important navs
 * @returns {JSX.Element}
 */
const Header: React.ComponentType = (): JSX.Element => {
  // Hooks goes here
  const location = useLocation();
  const navigate = useNavigate();
  const localStorageUtilCacheUserData = useMemo(
    () => localStorageUtil.checkItem(LOCAL_STORAGE_USER_DATA_KEY),
    [location.pathname, navigate],
  );
  const { user, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(tabReducer, tabInitialState);

  /**
   * function to open the tab means to show all the navs after clicking the navWithImage
   * @param {MouseEvent<HTMLElement>} event
   */
  const openTab = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
      if (state.openTabs.includes("0")) {
        dispatch({ type: "CLOSE_TAB", payload: "0" });
      } else {
        dispatch({ type: "OPEN_TAB", payload: "0" });
      }
    },
    [state.openTabs, dispatch],
  );

  // remove all the tabs one by one
  const removeAllTheTabsOneByOne = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CLOSE_ALL_TABS_ONE_BY_ONE",
    });
  }, []);

  // useEffect to which run one mount only to add even-listener in the body so after clicking the body user can remove the navs that opens as the container
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

  // Chime navs
  const navs = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
      isProtected: !isAuthenticated && !localStorageUtilCacheUserData, // if the user is not authenticated and there is not data at localstorge then only show the nav
      className: "chime-just-link",
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <FaPhoneAlt />,
      isProtected: !isAuthenticated && !localStorageUtilCacheUserData, // if the user is not authenticated and there is not data at localstorge then only show the nav
      className: "chime-just-link",
    },
    {
      path: "/login",
      name: "Login",
      icon: <FaUserPlus />,
      isProtected: !isAuthenticated && !localStorageUtilCacheUserData, // if the user is not authenticated and there is not data at localstorge then only show the nav
      className: "chime-btn chime-btn-secondary-link",
    },
    // {
    //   path: "/chats",
    //   name: "Chats",
    //   icon: <FaComments />,
    //   isProtected: isAuthenticated || localStorageUtilCacheUserData, // if the user is authenticated or there is data at localstorge then only show the nav
    //   className: "chime-just-link",
    // },
    {
      path: "/video-calls",
      name: "Video",
      icon: <FaVideo />,
      isProtected: isAuthenticated || localStorageUtilCacheUserData, // if the user is authenticated or there is data at localstorge then only show the nav
      className: "chime-just-link",
    },
    // {
    //   path: "/notifications",
    //   name: "Notifications",
    //   icon: <IoIosNotifications />,
    //   isProtected: isAuthenticated || localStorageUtilCacheUserData, // if the user is authenticated or there is data at localstorge then only show the nav
    //   className: "chime-just-link",
    // },
  ];

  // chime image nav which only show the navs as a container at user clicked
  const navsWithImage = [
    {
      path: "/profile",
      name: "Profile",
      imageURL: isAuthenticated ? user?.profilePicture : "",
      isProtected: isAuthenticated || localStorageUtilCacheUserData,
      className: "",
    },
  ];

  return (
    <header className="chime-header">
      <nav className="chime-header-navbar">
        <NavLink to="/">
          <ul className="chime-header-navbar-logos">
            <li className="chime-header-navbar-logo">
              <ChimeTalkLogo size="md"/>
            </li>
          </ul>
        </NavLink>

        <ul className="fixed right-0 bottom-3">
          <NepalFlagVersion version="1.0.0 beta" size="sm" showSideVersion={true}/>
        </ul>

        {/* Chime navs */}
        <ul className="chime-header-navbar-navs">
          {navs.map((currentNav) =>
            currentNav.isProtected === true ? (
              <li
                key={currentNav.name}
                className={`chime-header-navbar-navs-nav ${currentNav.className}`}
              >
                <NavLink
                  to={currentNav.path}
                  className={`chime-header-navbar-navs-nav-link`}
                >
                  <span className="chime-header-navbar-navs-nav-icon">
                    {currentNav.icon}
                  </span>
                  <span>{currentNav.name}</span>
                </NavLink>
              </li>
            ) : null,
          )}

          {/* chime container navs opener */}
          {navsWithImage.map((currentNav) => {
            const safeImageURL = currentNav.imageURL?.trim();
            if ((isAuthenticated && user) || localStorageUtilCacheUserData) {
              return (
                <li
                  key={currentNav.name}
                  className="chime-header-navbar-navs-profile"
                  onClick={(e) => openTab(e)}
                >
                  <img
                    src={safeImageURL}
                    alt={`${currentNav.name}`}
                    className="chime-header-navbar-navs-nav-profile-nav"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/29529706/2024/5/16/4db832c7-d67c-46bd-9599-fa167eb61e8b1715800226613SoftToysandDolls1.jpg";
                    }}
                  />
                </li>
              );
            }
            return null;
          })}

          {/* chime container navs */}
          {state.openTabs.length >= 0 &&
            state.openTabs.map(
              (tabId) =>
                tabId === "0" && (
                  <div
                    className="chime-profile-nav-fallback-container"
                    key={tabId}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Suspense fallback={<LoadingComponent />}>
                      {/* Chime pofile navs container */}
                      <ProfileHeader />
                    </Suspense>
                  </div>
                ),
            )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;


/** Future use */
// {/* Chime search-bar */}
// {(isAuthenticated || localStorageUtilCacheUserData) && (
//   <div className="chime-header-nav-search-bar">
//     <SearchComponent />
//     <span className="chime-header-nav-search-bar-icon">
//       {<CiSearch />}
//     </span>
//   </div>
// )}