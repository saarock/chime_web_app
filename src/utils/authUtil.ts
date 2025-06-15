// Import all the necessary dependencies here

import localStorageUtil from "./localStorageUtil";

class AuthUtil {
  static clientSideLogout() {
    // clear the localstorage data
    localStorageUtil.clear();
    // cookieUtil.clear();
    location.pathname = "/login";
  }
}

export default AuthUtil;
