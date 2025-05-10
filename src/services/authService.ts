// Import dependencies
import AuthEndPoint from "../apis";
import { AuthResponseData, UserLoginWithGoogleDetils } from "../types";
import { useClientLogout } from "../hooks";
import { cookieUtil, errorhandler } from "../utils";
import { REFRESH_TOKEN_KEY_NAME } from "../constant";

/**
 * AuthService handles all authentication-related operations such as 
 * login, token verification, and token refreshing.
 */
class AuthService {

    /**
     * Logs in a user using Google credentials.
     */
    static async loginWithGoogle(userDetails: UserLoginWithGoogleDetils): Promise<AuthResponseData> {
        try {
            const response = await AuthEndPoint.login(userDetails);

            if (!response?.data) {
                console.error("Unexpected login with google response:", response);
                useClientLogout();
                throw new Error("No data returned from login with google API");
            }

            const data = response.data;

            if (data.statusCode >= 400) {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            throw errorhandler(error);
        }
    }

    /**
     * Verifies the user's token on every page load and fetches user data.
     */
    static async verifyTokenOnEveryPageAndGetUserData(): Promise<AuthResponseData> {
        try {
            const response = await AuthEndPoint.verifyTokenAndGetUserData();
            if (!response?.data) {
                console.error("Unexpected verify token response:", response);
                useClientLogout();
                throw new Error("No data returned from verify user API");

            }
            return response.data;
        } catch (error) {
            // throw whole to see the status code also if the status code is 401 then another request should call and 
            // should generates new Tokens.
            throw error;
        }
    }

    /**
     * Refresh the access and refresh tokens using the stored refresh token.
     */
    static async refreshTokens(): Promise<AuthResponseData> {
        try {
            // Retrive the token from the cookie by using the helper
            const refreshToken = cookieUtil.get(REFRESH_TOKEN_KEY_NAME);

            if (!refreshToken) {
                // If refreshTokne on the cookie is not available then immediately logout  
                useClientLogout();
                // And throw the new Eror
                throw new Error("No refresh token found");
            }

            const response = await AuthEndPoint.refreshTokens(refreshToken);
            if (!response?.data) {
                console.error("Unexpected refresh token response:", response);
                useClientLogout();
                throw new Error("No data returned from refresh token API");
            }

            const axiosResponseData = response.data;
            return axiosResponseData;


        } catch (error) {
            throw errorhandler(error)
        }
    }
}

export default AuthService;
