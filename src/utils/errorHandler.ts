/**
 * 
 * @param error - error can be any thing
 * @param type - string that indicating the which type is running like login type , register type 
 * @throws An error accordingly
 */
const errorHandler = (error: any, type: string): never => {
    // Check if the error is from the server response
    if (error.response) {
        const status = error.response.status; // HTTP status code
        const data = error.response.data; // Response data (e.g., error message)

        // If the error is Unauthorized (401), handle it specifically
        if (status === 401) {
            // Throw a specific error message for bad credentials
            throw new Error(data?.error || "Unauthorized: Invalid credentials");
        }

        // If it's not a 401 error, throw a general error based on the response data
        throw new Error(typeof data === 'string' ? data : JSON.stringify(data));
    } else if (error.request) {
        // If no response was received (e.g., no internet connection), throw this error
        throw new Error(`No response received during ${type}`);
    } else {
        // If the error is unexpected, throw a generic error with the message
        throw new Error(error.message || `Something went wrong while ${type}`);
    }
};

export default errorHandler;
