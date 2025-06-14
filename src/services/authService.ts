// Import dependencies
import { AuthEndPoint } from "../apis";
import { AuthResponseData, UserLoginWithGoogleDetials } from "../types";
import { errorhandler } from "../utils";

/**
 * AuthService handles all authentication-related operations such as
 * login, token verification, and token refreshing.
 */
class AuthService {
  /**
   * Logs in a user using Google credentials.
   */
  static async loginWithGoogle(
    userDetails: UserLoginWithGoogleDetials,
  ): Promise<AuthResponseData> {
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
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
      
      throw errorhandler(error);
    }
  }

  /**
   * Refresh the access and refresh tokens using the stored refresh token.
   */
  static async refreshTokens(): Promise<AuthResponseData> {
    try {
      const response = await AuthEndPoint.refreshTokens();
      const axiosResponseData = await response.data;

      return axiosResponseData;
    } catch (error) {
      console.log(error);
      
      throw errorhandler(error);
    }
  }

  /**
   * Logout method
   * @param {string} param0.userId - User id received from the server through the database
   */
  static async logoutUser(userId: string) {
    try {
      await AuthEndPoint.logoutUser(userId);
    } catch (error) {
      throw errorhandler(error);
    }
  }
}

export default AuthService;
