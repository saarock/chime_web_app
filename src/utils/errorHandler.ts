import { isAxiosError } from "axios";
import { ApiError } from "./ApiError";

/**
 * General error handler function to process all errors consistently.
 * @param error - The error object caught in a try/catch or promise rejection.
 * @throws ApiError or Error after logging and possible logout.
 */
const errorhandler = (error: unknown): never => {
  if (isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      // Throw the error from the axios response
      throw new ApiError(data.message, status);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received from server:", error.message);
      throw new ApiError(
        error.message || "No response received from server.",
        503,
      );
    } else {
      // Something else happened while setting up the request
      console.error("Axios error without request/response:", error.message);
      throw new ApiError(
        error.message || "Internal error setting up request.",
        500,
      );
    }
  }

  // Non-Axios errors fallback
  const fallbackMessage =
    error instanceof Error
      ? error.message
      : "An unexpected error occurred.";
  console.error(fallbackMessage);
  throw new Error(fallbackMessage);
};

export default errorhandler;
