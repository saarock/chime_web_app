// Import all the necessary dependencies here
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

/**
 * Custom hook to control splash screen visibility based on authentication state.
 * 
 * This hook is primarily responsible for:
 * - Showing the splash screen only if the user is not authenticated.
 * - Automatically hiding the splash screen after a 2-second delay.
 * 
 * This improves user experience by giving a branded entry point and allowing time 
 * for app initialization or background tasks before showing the actual content.
 *
 * @returns {Object} - `showSplash`: boolean that indicates whether to show the splash screen.
 */
const useSplashScreen = () => {
  // Retrieve authentication status (custom hook)
  const { isAuthenticated } = useAuth();

  /**
   * Local state to manage splash screen visibility.
   * - Initially true if the user is not authenticated.
   * - Will auto-false after timeout.
   */
  const [showSplash, setShowSplash] = useState(!isAuthenticated);

  useEffect(() => {
    /**
     * Always trigger splash effect for 2 seconds regardless of current state.
     * This allows smoother transition especially during page refresh or cold starts.
     */
    const timeout = setTimeout(() => {
      setShowSplash(false); // Hide splash after delay
    }, 2000); // 2 seconds

    // Cleanup timeout if component unmounts early or dependency changes
    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  // Return the splash visibility status
  return { showSplash };
};

export default useSplashScreen;
