// Import all the necessary dependencies here 
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "../constant";
import { cookieUtil, localStorageUtil } from "../utils"

const useClientLogout = () => {
    // clear the localstorage data
    localStorageUtil.clear();
    // clear the cookies
    cookieUtil.clear(REFRESH_TOKEN_KEY_NAME);
    cookieUtil.clear(ACCESS_TOKEN_KEY_NAME);
    location.pathname ="/login";
}

export default useClientLogout;