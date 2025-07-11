
/**
 * This class is responsible to handle the errors specially api error
 */
class ApiError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode = 401, details?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;

    // Maintains proper stack trace (only on V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export {ApiError}