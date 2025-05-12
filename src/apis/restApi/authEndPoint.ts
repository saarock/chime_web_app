
//Import all the necessaray dependencies
import { axiosClient } from "../../config";
import {  UserLoginWithGoogleDetils } from "../../types";



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
    static async login(googleData: UserLoginWithGoogleDetils) {
        const response = await axiosClient.post("/login-with-google", googleData);
        return response;
    }

    static async refreshTokens(refreshToken:string) {
        const response = await axiosClient.post("/refresh-tokens", {refreshToken}, {   timeout: 10000});
        return response;
    }

    static async logoutUser(userId:string) {
        const response = await axiosClient.post("/logout-user", {userId});
        return response;
    }
}

export default AuthEndPoint;
