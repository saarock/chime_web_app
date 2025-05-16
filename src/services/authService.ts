// Import dependencies
import AuthEndPoint from "../apis";
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "../constant";
import { AuthResponseData, UserLoginWithGoogleDetils } from "../types";
import { AuthUtil, cookieUtil, errorhandler } from "../utils";

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
            const data = await response.data;
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
            return await response.data;
        } catch (error) {
            throw errorhandler(error);
        }
    }

    /**
     * Refresh the access and refresh tokens using the stored refresh token.
     */
    static async refreshTokens(): Promise<AuthResponseData> {
        try {
            const refreshToken = cookieUtil.get(REFRESH_TOKEN_KEY_NAME);
            if (!refreshToken) {
                AuthUtil.clientSideLogout();
                throw new Error("No accessToken available")
            }

            const response = await AuthEndPoint.refreshTokens(refreshToken);
            const axiosResponseData = await response.data;

            const newRefreshToken = axiosResponseData.data.refreshToken;
            const newAccessoken = axiosResponseData.data.accessToken;

            cookieUtil.set(ACCESS_TOKEN_KEY_NAME, newAccessoken);
            cookieUtil.set(REFRESH_TOKEN_KEY_NAME, newRefreshToken);

            return axiosResponseData;
        } catch (error) {
            throw errorhandler(error);
        }
    }

    static async logoutUser(userId: string) {
        try {
            await AuthEndPoint.logoutUser(userId);
        } catch (error) {
            throw errorhandler(error);
        }
    }
}

export default AuthService;
