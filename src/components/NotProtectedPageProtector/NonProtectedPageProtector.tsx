// Import all the necessary dependencies here
import React, { JSX, Suspense, useEffect } from "react";
import { PageProtectorProps } from "../../types";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useAuth } from "../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { localStorageUtil } from "../../utils";
import { LOCAL_STORAGE_USER_DATA_KEY } from "../../constant";

/**
 * NonProtectedPageProtector
 * Wraps public pages like Login, Register, etc.
 * Prevents logged-in users from accessing non-protected pages.
 * 
 * Handles:
 * - Redirect logged-in users away from login/register pages.
 * - Uses auth state (isAuthenticated) for reactive checks.
 * - Uses localStorage as fallback to detect login state on page reload.
 * - Supports Suspense fallback UI.
 * 
 * @param children ReactNode - The non-protected page content.
 * @returns JSX.Element
 */
const NonProtectedPageProtector: React.ComponentType<
  React.PropsWithChildren<PageProtectorProps>
> = ({ children }): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // 1. If user is authenticated by auth context, redirect them away from login/register
    if (isAuthenticated) {
      // Example: prevent access only to login or register pages
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/video-calls", { replace: true });
      }
    } else {
      // 2. If user is not authenticated by auth context, check localStorage fallback (e.g. after reload)
      const hasUserData = localStorageUtil.checkItem(LOCAL_STORAGE_USER_DATA_KEY);

      if (hasUserData) {
        // User info exists in localStorage but auth state is false
        // Possibly a stale state, so redirect them away from login/register as well
        if (location.pathname === "/login" || location.pathname === "/register") {
          navigate("/video-calls", { replace: true });
        }
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <>
      {/* Suspense fallback to show while lazy loading components */}
      <Suspense fallback={<LoadingComponent />}>
        {children}
      </Suspense>
    </>
  );
};

export default NonProtectedPageProtector;