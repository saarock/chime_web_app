// Import all the necessary dependencies here
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthService } from "../services";
import { AuthUtil, cookieUtil, localStorageUtil } from "../utils";
import {
  ACCESS_TOKEN_KEY_NAME,
  LOCAL_STORAGE_USER_DATA_KEY,
  REFRESH_TOKEN_KEY_NAME,
} from "../constant";
import { useDispatch } from "react-redux";
import { login } from "../apps";

/**
 * Custom React hook to verify the user's token on every protected page load
 * and fetch fresh user data when the access token is valid.
 *
 * @returns {Object} - Returns an object with:
 *  - isLoading: Boolean indicating loading state
 *  - errorMessage: String message for any error encountered
 *  - isError: Boolean indicating if there was an error
 *  - userData: User data object or null
 */

const useVerifyTokenAndGetUserData = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  /**
   * Verifies the token and fetches user data when a protected page is loaded.
   * Logout the client if tokens are missin from the client side.
   *
   * @async
   */
  const runOnEveryProtectedPageIfTheLocationChange =
    useCallback(async (): Promise<void> => {
      const accessToken = cookieUtil.checkCookie(ACCESS_TOKEN_KEY_NAME);
      const refreshToken = cookieUtil.checkCookie(REFRESH_TOKEN_KEY_NAME);
      // const userData = localStorageUtil.checkItem(LOCAL_STORAGE_USER_DATA_KEY);

      if (!accessToken || !refreshToken) {
        // If both tokens and userData from the localStorage are missing, log out the client.
        AuthUtil.clientSideLogout();
        return;
      }

      // Verify user data and get the user data from the backend
      const axiosResponseData =
        await AuthService.verifyTokenOnEveryPageAndGetUserData();
      dispatch(login(axiosResponseData.data.userData));
      localStorageUtil.setItems(
        LOCAL_STORAGE_USER_DATA_KEY,
        axiosResponseData.data.userData,
      );
    }, [location.pathname]);

  /**
   * Triggers token verification when the location changes (protected page load).
   */
  useEffect(() => {
    (async () => {
      // reset the values of the state and make the loading state true.
      setIsError(false);
      setErrorMessage(null);
      setIsLoading(true);
      try {
        await runOnEveryProtectedPageIfTheLocationChange();
      } catch (error) {
        setIsError(true);
        setErrorMessage(
          error instanceof Error ? error.message : "Cannot verify the user",
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location.pathname]);

  return { isLoading, errorMessage, isError };
};

export default useVerifyTokenAndGetUserData;
