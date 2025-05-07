import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "../constant";
import { cookieUtil, errorhandler } from "../utils";
import axios from "axios";

/**
 * AuthHelper handles common authentication operations such as error handling 
 * and token management that are reusable across various services.
 */
class AuthHelper {

    /**
     * Handles API errors consistently.
     */
    static handleApiError(error: unknown): never {
        if (axios.isAxiosError(error)) {
            throw errorhandler(error);
        } else {
            console.log(error instanceof Error ? error.message : "An unexpected error occurred.");
            
            throw new Error(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
    }

    /**`
     * Retrieves the refresh token from cookies.
     */
    static getRefreshToken(): string | null {
        return cookieUtil.get(REFRESH_TOKEN_KEY_NAME);
    }

    /**
     * Retrieves the access token from cookies.
     */
    static getAccessToken(): string | null {
        return cookieUtil.get(ACCESS_TOKEN_KEY_NAME);
    }

    /**
     * Sets new access and refresh tokens in cookies.
     */
    static setTokens(accessToken: string, refreshToken: string): void {
        cookieUtil.set(ACCESS_TOKEN_KEY_NAME, accessToken);
        cookieUtil.set(REFRESH_TOKEN_KEY_NAME, refreshToken);
    }
}

//All the necessary exports goes here 
export default AuthHelper;
