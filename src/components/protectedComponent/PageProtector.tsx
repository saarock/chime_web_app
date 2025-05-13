
// Import all the necessary dependencies here
import React, { JSX, lazy, Suspense, useEffect } from 'react';
import { PageProtectorProps } from '../../types';
import { useVerifyTokenAndGetUserData } from '../../hooks';


// lazy imports
const LoadingComponent = lazy(() => import('../loadingComponent/LoadingComponent'));
const ErrorUiComponent = lazy (() => import('../errorUiComponent/ErrorUiComponent'));



/**
 * PageProtector is a React component that wraps protected pages,
 * verifying the user's token before rendering the protected content.
 * If the token is invalid or expired, it shows an error message.
 *
 * @param {PageProtectorProps} props - React props containing `children` (the protected content)
 * @returns {JSX.Element} The protected content or an error message if the token is invalid
 */
const PageProtector: React.FC<PageProtectorProps> = ({ children }: PageProtectorProps): JSX.Element => {
    const { isError, errorMessage, } = useVerifyTokenAndGetUserData();


    // If an error is present (e.g., invalid/expired token), render the error message.
    if (isError && errorMessage) {
        return <ErrorUiComponent message={errorMessage}/>
    }

    
    // Otherwise, render the protected content.
    return <Suspense fallback={<LoadingComponent/>}>
        {children}
    </Suspense>
};

export default PageProtector;
