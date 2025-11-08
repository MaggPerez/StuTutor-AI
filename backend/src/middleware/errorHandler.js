/**
 * Global error handler middleware
 * Centralized error handling for all routes
 */

import { sendError } from '../utils/responseHelper.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(error => error.message);
    return sendError(res, messages.join(', '), 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return sendError(res, `${field} already exists.`, 400);
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return sendError(res, 'Invalid ID format.', 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired.', 401);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error.';
  
  return sendError(res, message, statusCode);
};

// 404 handler
export const notFound = (req, res, next) => {
  return sendError(res, `Route ${req.originalUrl} not found.`, 404);
};

