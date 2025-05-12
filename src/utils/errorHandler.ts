// Import all the necessary dependencies here
import { isAxiosError } from "axios";

/**
 * Error handler method to handle all types of errors
 * @param error 
 */
const errorhandler = (error: unknown): never => {
    if (isAxiosError(error)) {
        // if the error is axios error;
        if (error.response) {
            const data = error.response?.data;
            if (typeof data === 'string') {
                console.error(data);
                throw new Error(data);
            } else if (data && typeof data === 'object' && 'message' in data) {
                const message = (data as { message: string }).message;
                console.error(message);
                throw new Error(message);
            } else {
                console.error(error.message);
                throw new Error(error.message);
            }
        } else if (error.request) {
            console.error(error.message);
            throw new Error(error.message || "Something wrong while sending request to the server.");
        } else {
            const fallback = error.message || "Please refresh your page because some internal errors occurred.";
            console.error(fallback);
            throw new Error(fallback);
        }
    } else {
        // if the error is not axios error
        console.error(error instanceof Error ? error.message : "An unexpected error occurred.")
        throw new Error(error instanceof Error ? error.message : "An unexpected error occurred.");
    }
};

// Exports
export default errorhandler;
