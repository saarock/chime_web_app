//Import all the necessaray dependencies
import { axiosClient } from "../../config";
import { UserLoginWithGoogleDetials } from "../../types";

// Auth End points class that helps to follow the abstaraction [means hidding the unnecessary details]
class AuthEndPoint {
  /**
   *
   * @returns Axios Response
   */
  static async verifyTokenAndGetUserData() {
    const response = await axiosClient.get("/verify-user");
    return response;
  }

  /**
   *
   * @param googleData - includes [credentials, apiKey]
   * @returns Axios Response
   */
  static async login(googleData: UserLoginWithGoogleDetials) {
    const response = await axiosClient.post("/login-with-google", googleData);
    return response;
  }


  /**
   * This method is responsible to get and set the new cookies or tokens [Access and refresh tokens]
   * @returns {Axios Response}
   */
  static async refreshTokens() {
    const response = await axiosClient.post(
      "/refresh-tokens",
      {
        headers: {
          skipAuthRefresh: "true", // custom header
        },
      },
    );
    return response;
  }


  /**
   * 
   * @param {string} param0.userId - Id of the user
   * @returns {Axios response}
   */
  static async logoutUser(userId: string) {
    const response = await axiosClient.post("/logout-user", { userId });
    return response;
  }
}

export default AuthEndPoint;
