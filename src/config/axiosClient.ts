// Import necessary dependencies from axios and local token management
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshTokens } from "../manager";


// Interface representing a queued request during token refresh
interface FailedRequest {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}

// Flags and queue to manage concurrent token refreshes
let isRefreshing = false; // Indicates whether a refreshTokens() call is already in progress
let failedQueue: FailedRequest[] = []; // Queue to store requests waiting for a new token

// Axios configuration object for global defaults
const axiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base API URL, usually from .env
  withCredentials: true, // Send cookies (tokens) with cross-origin requests
  timeout: 15000, // 15-second timeout for all requests
};

// Creating a pre-configured axios instance
const axiosClient = axios.create(axiosDefaults);

// Interceptor to modify requests before they are sent
axiosClient.interceptors.request.use(
  function (config) {
    // Optionally modify request config (e.g., attach token)
    return config;
  },
  function (error) {
    // Handle request setup errors
    return Promise.reject(error);
  },
);

// Custom error response interface to match backend structure
interface ErrorResponse {
  errorCode: string; // e.g., "token_expired"
  data: null;
  statusCode: number; // HTTP status code (e.g., 401)
  message: string; // Human-readable error message
}

// Interceptor to globally handle responses and retry unauthorized requests
axiosClient.interceptors.response.use(
  (response) => response, // If the response is successful, return it directly
  async (error: AxiosError<ErrorResponse>) => {

    // Cast the request config to allow tracking of retry status
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Bypass token refresh for requests explicitly marked to skip
    if (originalRequest?.headers?.["skipAuthRefresh"]) {
      return Promise.reject(error);
    }

    // Conditions to attempt token refresh:
    // - Response status is 401 (unauthorized)
    // - Error code from server is "token_expired"
    // - Request has not already been retried
    const shouldRefresh =
      error.response &&
      error.response.status === 401 &&
      error.response.data?.errorCode === "token_expired" &&
      !originalRequest._retry;


    if (shouldRefresh) {
      originalRequest._retry = true; // Prevent infinite retry loops

      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        // Attempt to refresh the token
        await refreshTokens();

        // Retry all requests that were queued during refresh
        const queue = [...failedQueue];
        failedQueue = [];
        for (const { resolve, config } of queue) {
          resolve(axiosClient(config));
        }

        // Retry the original failed request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear the queue and reject all waiting requests
        failedQueue = [];
        return await Promise.reject(refreshError);
      } finally {
        // Ensure the refreshing flag is reset regardless of outcome
        isRefreshing = false;
      }
    }

    // If it's not a token-related error, propagate the error
    return await Promise.reject(error);
  },
);

// Export the configured axios instance for use across the application
export default axiosClient;
