
// Import all the created files from the apps folder expect index.js file  
import userReducer from "./features/auth/userSlice";
import socketReducer from "./features/socket/socketSlice";
import { connect, disconnect } from "./features/socket/socketSlice";
import SocketProvider from "./features/socket/SocketProvider";
import { login, logout, setError, clearError, } from "./features/auth/userSlice";
import { serverLoginWithGoogle } from "./features/auth/userSlice";


// export all the files that are under the apps folder after importing them
export {
    userReducer,
    socketReducer,
    connect,
    disconnect,
    SocketProvider,
    login,
    logout,
    setError,
    clearError,
    serverLoginWithGoogle,
};


