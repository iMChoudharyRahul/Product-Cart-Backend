/**
 * Custom error class for handling API errors
 */
class ApiError extends Error {
  // Constructor for the ApiError class
  constructor(
    statusCode, // HTTP status code for the error response
    message = "Something went wrong", // Default error message
    errors = [], // Array to store additional error details
    stack = "" // Stack trace for debugging (optional)
  ) {
    // Call the constructor of the base class (Error)
    super(message);

    // Set properties specific to the ApiError class
    this.statusCode = statusCode; // Store the HTTP status code
    this.data = null; // Placeholder for additional data (can be customized as needed)
    this.message = message; // Set the error message
    this.success = false; // Indicate that the request was not successful
    this.errors = errors; // Store additional error details

    // If a stack trace is provided, set it; otherwise, capture the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class for use in other modules
export { ApiError };
