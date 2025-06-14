// Import All the necessary dependencies
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { refreshTokens } from "../manager";

interface FailedRequest {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const axiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000, // 15sec
};
// Creating axios instance
const axiosClient = axios.create(axiosDefaults);

// axios request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

interface ErrorResponse {
  errorCode: string;
  data: null;
  statusCode: number;
  message: string;
}

// Response interceptor to handle 401 and refresh the access token
axiosClient.interceptors.response.use(
  (response) => response, // Return the response if everything is fine
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (originalRequest?.headers?.["skipAuthRefresh"])
      return Promise.reject(error);

    const shouldRefresh =
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data &&
      error.response.data.errorCode === "token_expired" &&
      !originalRequest._retry;

    if (shouldRefresh) {
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Set the request as retried true to avoid the infinite loops;
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        await refreshTokens();
        const queue = [...failedQueue];
        failedQueue = [];

        for (const { resolve, config } of queue) {
          resolve(axiosClient(config));
        }
        
        return axiosClient(originalRequest);
      } catch (refreshError) {
        failedQueue = [];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error); // Propagate the error if refresh fails
  },
);

export default axiosClient;
