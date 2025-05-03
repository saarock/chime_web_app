// Import all the necessary dependencies
import AuthEndPoint from "../apis";
import { UserLoginWithDetils } from "../types";
import { errorHandler, responseHandler } from "../utils";

class AuthService {

    /**
     * 
     * @returns userData
     */
    static async verifyTokenOnEveryPageAndGetUserData() {
        try {
            const response = await AuthEndPoint.verifyTokenAndGetUserData();
            const data = responseHandler(response, "get");
            return data;
        } catch (error: any) {
            errorHandler(error, "verifyToken and get user data");
        }
    }




    /**
     * 
     * @param userDetails - The login data [email, password]
     * @returns Axios API response
     */
    static async login(userDetails: UserLoginWithDetils) {
        try {
            const response = await AuthEndPoint.login(userDetails);
            const data = responseHandler(response, "post");
            return data;
        } catch (error: any) {
            /** Call the function or util that can handel any type of the Errors and takes two 
             *  argument one is error that can be any type and another one takes the types which means 
             * at which api error occurs
            **/
            errorHandler(error, "login");
        }
    }
}


export default AuthService;
