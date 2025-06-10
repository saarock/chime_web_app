// Import all the ncessary dependencies here
import React, { JSX, useCallback} from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useAuth, useErrorHandlerAtPageAndComponentLevel } from "../../hooks";
import { logoutUserFromServer, setError } from "../../features/auth/userSlice";
import { AppDispatch } from "../../apps/store";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

/**
 * stand-alone Logout component
 * @note this component css in on [/styles/components/ProfileHeader.css file]
 * @returns {JSX.Element}
 */
const LogoutComponent: React.ComponentType = (): JSX.Element => {
  // All the hook goes here
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useAuth();
  const { setErrorMessageFallBack } = useErrorHandlerAtPageAndComponentLevel();


  /**
   * async function to handel the logout from the cliet side
   */
  const logoutUser = useCallback(async () => {
    if (!user?._id) {
      dispatch(setError("User id doesn't found we doubt to you that you are valid user or not pleased refresh the page and try agian."));
      return;
    }
    try {
      // React-redux async action to logout the user from the server side and client side
      await dispatch(logoutUserFromServer(user._id)).unwrap();
    } catch (error) {
      setErrorMessageFallBack(error); // pass the error to fallback error handler
    }
  }, [user?._id]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <li
          className="chime-profile-header-navs-item chime-logout"
          onClick={logoutUser}
        >
          <span className="chime-profile-header-navs-icon">
            <FaSignOutAlt />
          </span>
          <span className="chime-profile-header-navs-text">Logout</span>
        </li>
      )}
    </>
  );
};

export default LogoutComponent;
