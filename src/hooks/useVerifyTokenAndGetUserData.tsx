// Import all the necessary dependencies here
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ApiError } from "../utils";
import { useDispatch } from "react-redux";
import { setError, verifyUserFromTheServer } from "../features/auth/userSlice";
import { AppDispatch } from "../apps/store";
import { ErrorState } from "../types";
import useErrorHandlerAtPageAndComponentLevel from "./useErrorHandlerAtPageAndComponentLevel";


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
  const dispatch = useDispatch<AppDispatch>();
  const { setErrorMessageFallBack } = useErrorHandlerAtPageAndComponentLevel();

  /**
   * Verifies the token and fetches user data when a protected page is loaded.
   * Logout the client if tokens are missin from the client side.
   *
   * @async
   */
  const runOnEveryProtectedPageIfTheLocationChange =
    useCallback(async (): Promise<void> => {
      // Verify user data and get the user data from the backend
      try {
        await dispatch(verifyUserFromTheServer()).unwrap();
      } catch (error) {
        setErrorMessageFallBack(error);
      }
    }, [location.pathname]);

  /**
   * Triggers token verification when the location changes (protected page load).
   */
  useEffect(() => {
    (async () => {
      // reset the values of the state and make the loading state true.
      setIsLoading(true);
      try {
        await runOnEveryProtectedPageIfTheLocationChange();
      } catch (error) {
        if (error instanceof ApiError) {
          const errorMessage: ErrorState = {
            message: error.message,
            statusCode: error.statusCode,
            details: error.details,
          }
          dispatch(setError(errorMessage))
        } else {
          setErrorMessageFallBack(error);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location.pathname]);

  return { isLoading, };
};

export default useVerifyTokenAndGetUserData;
