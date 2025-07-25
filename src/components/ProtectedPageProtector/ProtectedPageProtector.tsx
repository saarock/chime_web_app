// Import all the necessary dependencies here
import React, { JSX, lazy, Suspense } from "react";
import { PageProtectorProps } from "../../types";
import { useSplashScreen, useVerifyTokenAndGetUserData } from "../../hooks";
import SplashScreen from "../SplashScreen/SplashScreen";

// lazy imports
const LoadingComponent = lazy(
  () => import("../LoadingComponent/LoadingComponent"),
);

/**
 * PageProtector is a React component that wraps protected pages,
 * verifying the user's token before rendering the protected content.
 * If the token is invalid or expired, it shows an error message.
 *
 * @param {PageProtectorProps} props - React props containing `children` (the protected content)
 * @returns {JSX.Element} The protected content or an error message if the token is invalid
 */
const ProtectedPageProtector: React.FC<PageProtectorProps> = ({
  children,
}: PageProtectorProps): JSX.Element => {
  // All the hooks goes here
  useVerifyTokenAndGetUserData(); // This is the hook helps to chech the current user valid or not
  const { showSplash } = useSplashScreen()
  // Initilize the chat socket on whole page
  // useChatSocket(); // Keep for the future


  // Show splash only if unauthenticated and splash time hasn't passed
  if (showSplash) {
    return <SplashScreen />;
  }


  // Otherwise, render the protected content.
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
};

export default ProtectedPageProtector;
