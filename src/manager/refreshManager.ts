// auth/refreshManager.ts
import { AuthService } from "../services";


let refreshPromise: Promise<boolean> | null = null;

/**
 * Ensures only one token refresh is performed at a time.
 * All calls during refresh wait for the same Promise.
 */
function refreshTokens(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = AuthService.refreshTokens()
      .then((_) => {
        return true;
      })
      .catch((error) => {
        console.error("Token refresh failed:", error);
        throw error;
      })
      .finally(() => {
        refreshPromise = null; // Reset lock
      });
  }

  return refreshPromise;
}

export default refreshTokens;
