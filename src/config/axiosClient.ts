// Import All the necessary dependencies
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { AuthUtil, cookieUtil } from "../utils";
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "../constant";
import { AuthService } from "../services";




interface FailedRequest {
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
    config: InternalAxiosRequestConfig;
}


let isRefreshing = false;
let failedQueue: FailedRequest[] = [];


const axiosDefaults = {
    baseURL: "http://localhost:8000/api/v1/users",
    withCredentials: true,
    timeout: 15000 // 15sec
}
// Creating axios instance 
const axiosClient = axios.create(axiosDefaults);


// axios request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        const accessToken = cookieUtil.get(ACCESS_TOKEN_KEY_NAME);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
);

interface ErrorResponse {
    errorCode: string;
    data: null;
    statusCode: number;
    message: string;
}


// Response interceptor to handle 401 and refresh the access token
axiosClient.interceptors.response.use(
    response => response,  // Return the response if everything is fine
    async (error: AxiosError<ErrorResponse>) => {

        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean, };

        if (originalRequest?.headers?.["skipAuthRefresh"]) return Promise.reject(error);


        const shouldRefresh = error.response && error.response.status === 401 && !originalRequest._retry && error.response.data && error.response.data.errorCode === "token_expired" && !originalRequest._retry

        if (shouldRefresh) {
            if (!originalRequest._retry) {
                originalRequest._retry = true; // Set the request as retried true to avoid the infinite loops;
            }

            const refreshToken = cookieUtil.get(REFRESH_TOKEN_KEY_NAME);

            if (!refreshToken) {
                AuthUtil.clientSideLogout();
                return Promise.reject(error); // No refresh token available, reject immediately
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest });
                })
            }

            isRefreshing = true;

            try {

                const axiosResponseData = await AuthService.refreshTokens(refreshToken);
                const newAccessoken = axiosResponseData.data.accessToken;
                const newRefreshToken = axiosResponseData.data.refreshToken;

                cookieUtil.set(ACCESS_TOKEN_KEY_NAME, newAccessoken);
                cookieUtil.set(REFRESH_TOKEN_KEY_NAME, newRefreshToken);

                // ✅ Set the global default header before retrying
                axiosClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessoken}`;

                failedQueue.forEach(({ resolve, config }) => {
                    config.headers.Authorization = `Bearer ${newAccessoken}`;
                    resolve(axiosClient(config));
                });

                failedQueue = [];

                return axiosClient(originalRequest);
            } catch (refreshError) {
                failedQueue.forEach(({ reject }) => {
                    reject(refreshError);
                });
                failedQueue = [];
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);  // Propagate the error if refresh fails
    }
);



export default axiosClient;