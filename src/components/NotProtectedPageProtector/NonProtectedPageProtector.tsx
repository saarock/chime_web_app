// NonProtectedPageProtector.tsx

// Import all the necessary dependencies here 
import React, { JSX, Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageProtectorProps } from "../../types";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useAuth, useCheckUserIsLoginOrNot, useLoading } from "../../hooks";

/**
 * 🧩 NonProtectedPageProtector
 *
 * This component wraps public routes like `/login` or `/register`.
 * If the user is already authenticated (via Redux or token validation),
 * it will redirect them to the main area (e.g., `/video-calls`), preventing
 * access to login or register pages again.
 *
 * ✅ Use Cases:
 * - Prevent access to public pages for logged-in users
 * - Auto-redirect based on login state
 * - Restore login session after page refresh (via cookie/token)
 *
 * ⚠️ Internally uses:
 * - `useAuth`: for reactive login state via Redux
 * - `useCheckUserIsLoginOrNot`: checks and syncs login state via server
 * - `useLoading`: shows fallback loading state while verifying login
 */
const NonProtectedPageProtector: React.FC<React.PropsWithChildren<PageProtectorProps>> = ({
  children,
}): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🌐 Check if user is logged in (reactively via Redux)
  const { isAuthenticated } = useAuth();

  // 🕒 Check if a background login check is in progress
  const { isLoading } = useLoading();

  // 🧠 Custom hook: makes API call to restore session from token (e.g., on refresh)
  useCheckUserIsLoginOrNot();

  useEffect(() => {
    // ⏳ Wait until background login check completes
    if (isLoading) return;

    // 🚫 Block access to login/register pages for logged-in users
    if (
      isAuthenticated &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/video-calls", { replace: true });
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  // If the state is in the loading 
  if (isLoading) return <LoadingComponent />

  return (
    <Suspense fallback={<LoadingComponent />}>
      {children}
    </Suspense>
  );
};

export default NonProtectedPageProtector;
