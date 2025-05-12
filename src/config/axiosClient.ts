// Import All the necessary dependencies
import axios from "axios";
import { cookieUtil, localStorageUtil } from "../utils";
import { ACCESS_TOKEN_KEY_NAME, LOCAL_STORAGE_USER_DATA_KEY, REFRESH_TOKEN_KEY_NAME } from "../constant";
import { AuthService } from "../services";
import { useClientLogout } from "../hooks";



const axiosDefaults = {
    baseURL: "http://localhost:8000/api/v1/users",
    withCredentials: true,
}
// Creating axios instance 
const axiosClient = axios.create(axiosDefaults);


axiosClient.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${cookieUtil.get(ACCESS_TOKEN_KEY_NAME)}`;
        return config;
    },

    function (error) {
        return Promise.reject(error);
    }

);



// Response interceptor to handle 401 and refresh the access token
axiosClient.interceptors.response.use(
    response => response,  // Return the response if everything is fine
    async (error) => {
        if (error.response?.status === 401) {
            // If the access token is expired, try to refresh it using the refresh token
            const refreshToken = cookieUtil.get(REFRESH_TOKEN_KEY_NAME);
            if (refreshToken) {
                try {
                    const axiosResponseData = await AuthService.refreshTokens();
                    localStorageUtil.setItems(LOCAL_STORAGE_USER_DATA_KEY, axiosResponseData.data.userData);
                    cookieUtil.set(ACCESS_TOKEN_KEY_NAME, axiosResponseData.data.accessToken);
                    cookieUtil.set(REFRESH_TOKEN_KEY_NAME, axiosResponseData.data.refreshToken);

                    // Retry the original request with the new access token
                    error.config.headers.Authorization = `Bearer ${axiosResponseData.data.accessToken}`;
                    return axiosClient(error.config);
                } catch (refreshError) {
                    // If refresh token request fails, redirect user to login or handle as necessary
                    console.error("Unable to refresh token:", refreshError);
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);  // Propagate the error if refresh fails
    }
);



export default axiosClient;

