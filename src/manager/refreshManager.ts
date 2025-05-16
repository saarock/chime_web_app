// auth/refreshManager.ts
import { AuthService } from "../services";
import { cookieUtil } from "../utils";
import {
    ACCESS_TOKEN_KEY_NAME,
    REFRESH_TOKEN_KEY_NAME,
} from "../constant";

let refreshPromise: Promise<string> | null = null;

/**
 * Ensures only one token refresh is performed at a time.
 * All calls during refresh wait for the same Promise.
 */
function refreshTokens(): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = AuthService.refreshTokens()
            .then((res) => {
                const { accessToken, refreshToken } = res.data;
                cookieUtil.set(ACCESS_TOKEN_KEY_NAME, accessToken);
                cookieUtil.set(REFRESH_TOKEN_KEY_NAME, refreshToken);
                return accessToken;
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
