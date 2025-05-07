// Import all the necessary dependencies here 
import { useCallback, useEffect, useState } from 'react';
import { checkTheErrorWithTheStatusCode, cookieUtil, localStorageUtil } from '../utils';
import { AuthService } from '../services';
import { ACCESS_TOKEN_KEY_NAME, LOCAL_STORAGE_USER_DATA_KEY, REFRESH_TOKEN_KEY_NAME } from '../constant';
import { useDispatch } from 'react-redux';
import { login } from '../apps';
import useClientLogout from './useClientLogout';

/**
 * Custom React hook to manage token refreshing and user data retrieval.
 * It handles access token expiration by requesting new tokens and updating
 * the Redux store, cookies, and localStorage.
 *
 * @returns {Object} - Returns an object with:
 *  - setError: Function to set an error (triggers token handling flow)
 *  - uiErrorMessage: A string representing the current error message for the UI
 */
const useRefreshTokensAndGetNewTokensWithUserData = () => {
    const [error, setError] = useState<unknown | null>();

    const [uiErrorMessage, setUiErrorMessage] = useState<string>(''); // Ui error message means error message came from the server make ready to show in the UI 
    const dispatch = useDispatch();


    /**
     * Refreshes the access and refresh tokens, and updates user data.
     * This function updates cookies, localStorage, and Redux state with new values.
     *
     * @async
     */
    const refreshTokensAndGetUserDataWithTokens = useCallback(async (): Promise<void> => {
        try {
            const axiosResponseData = await AuthService.refreshTokens();
            localStorageUtil.setItems(LOCAL_STORAGE_USER_DATA_KEY, axiosResponseData.data.userData);
            cookieUtil.set(ACCESS_TOKEN_KEY_NAME, axiosResponseData.data.accessToken);
            cookieUtil.set(REFRESH_TOKEN_KEY_NAME, axiosResponseData.data.refreshToken);
            dispatch(login(axiosResponseData.data.userData));
        } catch (error: unknown) {
            console.log("Error encountered:", error);  // Log here to check the error before setting the state
            const checkIsAxiosError = checkTheErrorWithTheStatusCode.isAxiosError(error); // Check the error is axiosError or not
            const statusCode = checkIsAxiosError?.status; // Check the status code

            if (checkIsAxiosError && statusCode && statusCode === 401) { // if the error is Axios error and status code is 401 unauthorize logout the user frm the client side
                useClientLogout();
                return;
            }
            // Other wise show the error to the user
            setUiErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while refreshing tokens.'
            );

        }
    }, [dispatch]);

    /**
     * Handles different error scenarios, checking if token refresh is needed.
     *
     * @param {unknown} error - The error object thrown during token validation or user data fetch
     */
    const handleError = useCallback((error: unknown): void => {
        const isAxiosError = checkTheErrorWithTheStatusCode.isAxiosError(error);
        if (!isAxiosError) {
    
            setUiErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while verifying the user and fetching user data Pleased refresh your page.'
            );
            return;
        }

        const statusCode = checkTheErrorWithTheStatusCode.checkTheStatusCode(isAxiosError);
        if (statusCode === 401) {
            refreshTokensAndGetUserDataWithTokens();
        } else {
            setUiErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while verifying the user and fetching user data.'
            );
        }
    }, [error]);

    /**
     * Listens for errors and triggers appropriate handling when the `error` state changes.
     */
    useEffect(() => {
        if (error) {
            handleError(error);
        }
    }, [error]);

    return { setError, uiErrorMessage, setUiErrorMessage };
};

export default useRefreshTokensAndGetNewTokensWithUserData;
