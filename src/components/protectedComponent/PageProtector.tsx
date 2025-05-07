
// Import all the necessary dependencies here
import React, { JSX, useCallback, useEffect } from 'react';
import { PageProtectorProps } from '../../types';
import { useVerifyTokenAndGetUserData } from '../../hooks';
import { useDispatch } from 'react-redux';
import { login } from '../../apps';
import { LOCAL_STORAGE_USER_DATA_KEY } from '../../constant';
import { localStorageUtil } from '../../utils';

/**
 * PageProtector is a React component that wraps protected pages,
 * verifying the user's token before rendering the protected content.
 * If the token is invalid or expired, it shows an error message.
 *
 * @param {PageProtectorProps} props - React props containing `children` (the protected content)
 * @returns {JSX.Element} The protected content or an error message if the token is invalid
 */
const PageProtector: React.FC<PageProtectorProps> = ({ children }: PageProtectorProps): JSX.Element => {
    const { userData, isError, errorMessage  } = useVerifyTokenAndGetUserData();
    const dispatch = useDispatch();

    /**
     * Saves user data to both localStorage and Redux when valid user data is available.
     */
    const saveTheUserDataInTheLocalStorageAndReduxState = useCallback((): void => {
        if (userData) {
            dispatch(login(userData));
            localStorageUtil.setItems(LOCAL_STORAGE_USER_DATA_KEY, userData);
        }
    }, [userData, dispatch]);

    /**
     * Updates localStorage and Redux state whenever userData changes.
     */
    useEffect(() => {
        saveTheUserDataInTheLocalStorageAndReduxState();
    }, [userData, saveTheUserDataInTheLocalStorageAndReduxState]);

    // If an error is present (e.g., invalid/expired token), render the error message.
    if (isError) {
        return <h1>{errorMessage}</h1>;
    }

    // Otherwise, render the protected content.
    return children;
};

export default PageProtector;
