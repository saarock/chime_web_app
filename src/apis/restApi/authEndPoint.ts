
//Import all the necessaray dependencies
import { axiosClient } from "../../config";
import { UserLoginWithDetils } from "../../types";



// Auth End points class that helps to follow the abstaraction [means hidding the unnecessary details]
class AuthEndPoint {


    /**
     * 
     * @returns Axios Response
     */
    static async verifyTokenAndGetUserData() {
        const response = await axiosClient.get("/user-uid");
        return response;
    }

    /**
     * 
     * @param userData - UserData includes user informations for login such as email or userName and password 
     * @returns Axios Response 
     */
    static async login(userData: UserLoginWithDetils) {
        const response = await axiosClient.post("/login", userData);
        return response;
    }
}

export default AuthEndPoint;
