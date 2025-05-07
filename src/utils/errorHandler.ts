// Import all the necessary dependencies here
import { AxiosError } from "axios";

/**
 * Error handler method to handle all types of errors
 * @param error 
 */
const errorhandler = (error: AxiosError): never => {
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
        throw new Error(error.message);
    } else {
        const fallback = error.message || "Please refresh your page because some internal errors occurred.";
        console.error(fallback);
        throw new Error(fallback);
    }
};

// Exports
export default errorhandler;
