// Import all the necessary dependencies here
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

/**
 * Custom hook to manage splash screen visibility based on user authentication status.
 * 
 * Behavior:
 * - When the user is NOT authenticated:
 *   - Show the splash screen immediately.
 *   - Automatically hide the splash screen after 3 seconds.
 * - When the user IS authenticated:
 *   - Hide the splash screen immediately.
 * 
 * This enhances UX by showing a branded entry while the app initializes or handles auth.
 *
 * @returns {Object} An object with `showSplash` boolean indicating splash screen visibility.
 */
const useSplashScreen = () => {
  // Retrieve current authentication state using a custom auth hook
  const { isAuthenticated } = useAuth();

  /**
   * Local state controlling the splash screen visibility:
   * - Initialized to true if user is NOT authenticated, false otherwise.
   * - Updates based on authentication status changes.
   */
  const [showSplash, setShowSplash] = useState(!isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // User is not authenticated, so show splash immediately
      setShowSplash(true);

      // Start a timer to hide splash screen after 3 seconds,
      // allowing time for any initial loading or transitions
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);

      // Cleanup function to clear timer if auth status changes or component unmounts
      return () => clearTimeout(timer);
    } else {
      // User is authenticated, so hide splash screen immediately
      setShowSplash(false);
    }
  }, [isAuthenticated]);

  // Return current splash screen visibility status
  return { showSplash };
};

export default useSplashScreen;
