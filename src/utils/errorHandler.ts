
// Import all the necessary dependencie here
import { isAxiosError } from "axios";
import { ApiError } from "./ApiError";

/**
 * General error handler function to process all errors consistently.
 * @param error - The error object caught in a try/catch or promise rejection.
 * @throws ApiError or Error after logging and possible logout.
 */
const errorhandler = (error: unknown): Error => {

  if (error instanceof ApiError) {
    console.warn("Already an ApiError, rethrowing.");
    console.warn("Stack trace of the ApiError:", error.stack);
    return error
  }

  if (isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      // Throw the error from the axios response
      return new ApiError(data.message, status);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received from server:", error.message);
      return new ApiError(
        error.message || "No response received from server.",
        503,
      );
    } else {
      // Something else happened while setting up the request
      console.error("Axios error without request/response:", error.message);
      return new ApiError(
        error.message || "Internal error setting up request.",
        500,
      );
    }
  }

  //  errors fallback
  const fallbackMessage =
    error instanceof Error
      ? error.message
      : "An unexpected error occurred.";

  throw new ApiError(fallbackMessage, 500);
};

export default errorhandler;
