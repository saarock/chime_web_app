import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "../constant";
import cookieUtil from "./cookieUtil";
import localStorageUtil from "./localStorageUtil";

class AuthUtil {
    static clientSideLogout() {
        // clear the localstorage data
        localStorageUtil.clear();
        // clear the cookies
        cookieUtil.clear(REFRESH_TOKEN_KEY_NAME);
        cookieUtil.clear(ACCESS_TOKEN_KEY_NAME);
        location.pathname = "/login";
    }
}

export default AuthUtil;
