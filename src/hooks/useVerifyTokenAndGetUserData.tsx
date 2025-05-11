// Import all the necessary dependencies here 
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthService } from '../services';
import { cookieUtil, localStorageUtil } from '../utils';
import { ACCESS_TOKEN_KEY_NAME, LOCAL_STORAGE_USER_DATA_KEY, REFRESH_TOKEN_KEY_NAME } from '../constant';
import useClientLogout from './useClientLogout';
import { User } from '../types';
import useRefreshTokensAndGetNewTokensWithUserData from './useRefreshTokensAndGetNewTokensWithUserData';

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

    // THIS hook run if there is a error while verifying the user from the server
    const { setError, uiErrorMessage, setUiErrorMessage } = useRefreshTokensAndGetNewTokensWithUserData();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);


    /**
     * Verifies the token and fetches user data when a protected page is loaded.
     * Logs out the client if tokens are missing.
     *
     * @async
     */
    const runOnEveryProtectedPageIfTheLocationChange = useCallback(async (): Promise<void> => {
        const accessToken = cookieUtil.checkCookie(ACCESS_TOKEN_KEY_NAME);
        const refreshToken = cookieUtil.checkCookie(REFRESH_TOKEN_KEY_NAME);
        const userData = localStorageUtil.checkItem(LOCAL_STORAGE_USER_DATA_KEY);

        if (!accessToken || !refreshToken || !userData) {
            // If both tokens and userData from the localStorage are missing, log out the client.
            useClientLogout();
            return;
        }

        // Verify user data and get the user data from the backend
        const axiosResponseData = await AuthService.verifyTokenOnEveryPageAndGetUserData();
        setUserData(axiosResponseData.data.userData);

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
                // Set the error so userRefreshHook... useEffect hook can take as a reactive and can bring the refreshs tokens with the user data from the backend.
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [location.pathname]);




    /**
     * Updates local error state if the UI error message changes.
     */
    useEffect(() => {
        if (uiErrorMessage.trim() !== '') {
            setIsError(true);
            setErrorMessage(uiErrorMessage);
            setUiErrorMessage("") // reset the value becuase if the error messge is same then the effect doesnot run in the case of the primative data types.
        }
    }, [uiErrorMessage]);


    return { isLoading, errorMessage, isError, userData };
};

export default useVerifyTokenAndGetUserData;
