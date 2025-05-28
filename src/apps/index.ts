// Import all the created files from the apps folder expect index.js file
import userReducer from "../features/auth/userSlice";
import { login, logout } from "../features/auth/userSlice";
import { serverLoginWithGoogle } from "../features/auth/userSlice";

// export all the files that are under the apps folder after importing them
export { userReducer, login, logout, serverLoginWithGoogle };
