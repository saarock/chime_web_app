// Import all the necessary dependencies here
import React, {
  JSX,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useAuth } from "../../hooks";
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
import LoadingBar from "react-top-loading-bar"; // ✅ Import LoadingBar
import Logo from "../Logo/Logo";

const ProfileHeader = lazy(() => import("./ProfileHeader"));

/**
 * Chime main header component to show all the important navs
 * @returns {JSX.Element}
 */
const Header: React.ComponentType = (): JSX.Element => {
  // Hooks goes here
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(tabReducer, tabInitialState);
  const loadingBarRef = useRef<any>(null); // ✅ ref for loading bar

  // Track if route changes to start and complete loading
  useEffect(() => {
    loadingBarRef.current?.continuousStart(); // Start loading
    const timeout = setTimeout(() => {
      loadingBarRef.current?.complete(); // Finish after slight delay
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);



  /**
   * Toggle tab dropdown (e.g., profile menu)
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

  /**
   * Close all tabs when clicking outside
   */
  const removeAllTheTabsOneByOne = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CLOSE_ALL_TABS_ONE_BY_ONE",
    });
  }, []);

  // Add global click listener to close tabs
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      removeAllTheTabsOneByOne(e);
    };

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  // Chime navs
  const navs = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
      isProtected: !isAuthenticated,
      className: "chime-just-link",
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <FaPhoneAlt />,
      isProtected: !isAuthenticated,
      className: "chime-just-link",
    },
    {
      path: "/login",
      name: "Login",
      icon: <FaUserPlus />,
      isProtected: !isAuthenticated,
      className: "chime-btn chime-btn-secondary-link",
    },
    {
      path: "/video-calls",
      name: "Video",
      icon: <FaVideo />,
      isProtected: isAuthenticated,
      className: "chime-just-link",
    },
  ];

  // nav with image (profile)
  const navsWithImage = [
    {
      path: "/profile",
      name: "Profile",
      imageURL: isAuthenticated ? user?.profilePicture : "",
      isProtected: isAuthenticated,
      className: "",
    },
  ];

  return (
    <>
      {/* ✅ Loading bar at top */}
      <LoadingBar color="#007bff" height={3} ref={loadingBarRef} />

      <header className="chime-header">
        <nav className="chime-header-navbar">
          <NavLink to="/">
            <ul className="chime-header-navbar-logos">
              <li className="chime-header-navbar-logo">
                <Logo />
              </li>
            </ul>
          </NavLink>

          <ul className="fixed right-0 bottom-3">
            <NepalFlagVersion version="1.0.0 beta" size="sm" showSideVersion={true} />
          </ul>

          <ul className="chime-header-navbar-navs">
            {/* Text links */}
            {navs.map((nav) =>
              nav.isProtected ? (
                <li key={nav.name} className={`chime-header-navbar-navs-nav ${nav.className}`}>
                  <NavLink to={nav.path} className="chime-header-navbar-navs-nav-link">
                    <span className="chime-header-navbar-navs-nav-icon">{nav.icon}</span>
                    <span>{nav.name}</span>
                  </NavLink>
                </li>
              ) : null,
            )}

            {/* Profile tab with image */}
            {navsWithImage.map((nav) => {
              const safeImageURL = nav.imageURL?.trim();
              if ((isAuthenticated && user)) {
                return (
                  <li
                    key={nav.name}
                    className="chime-header-navbar-navs-profile"
                    onClick={(e) => openTab(e)}
                  >
                    <img
                      src={safeImageURL}
                      alt={`${nav.name}`}
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

            {/* Profile header container (dropdown) */}
            {state.openTabs.includes("0") && (
              <div
                className="chime-profile-nav-fallback-container"
                onClick={(e) => e.stopPropagation()}
              >
                <Suspense fallback={<LoadingComponent />}>
                  <ProfileHeader />
                </Suspense>
              </div>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
