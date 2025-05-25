// Import all the necessary dependencies here
import React, { JSX, lazy, Suspense } from "react";
import { PageProtectorProps } from "../../types";
import { useChatSocket, useVerifyTokenAndGetUserData } from "../../hooks";

// lazy imports
const LoadingComponent = lazy(
  () => import("../LoadingComponent/LoadingComponent"),
);
const ErrorUiComponent = lazy(
  () => import("../ErrorUiComponent/ErrorUiComponent"),
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
  const { isError, errorMessage } = useVerifyTokenAndGetUserData();
  // Initilize the chat socket on whole page
  useChatSocket();

  // If an error is present (e.g., invalid/expired token), render the error message.
  if (isError && errorMessage) {
    return <ErrorUiComponent message={errorMessage} />;
  }

  // Otherwise, render the protected content.
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
};

export default ProtectedPageProtector;
