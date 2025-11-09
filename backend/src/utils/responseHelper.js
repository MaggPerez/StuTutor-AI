/**
 * Response helper utility
 * Standardizes all API responses (success/error) for consistency
 */

/**
 * Send a successful response
 * @param {Object} res - Express response object
 * @param {Object} data - Response data
 * @param {number} statusCode - HTTP status code (default: 200)
 */
export const sendSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {string} error - Error message
 * @param {number} statusCode - HTTP status code (default: 400)
 */
export const sendError = (res, error, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    error,
  });
};

