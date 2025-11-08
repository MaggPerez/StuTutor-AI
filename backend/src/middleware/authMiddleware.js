/**
 * Authentication middleware
 * Verifies JWT tokens for protected endpoints
 */

import jwt from 'jsonwebtoken';
import { sendError } from '../utils/responseHelper.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'No token provided. Authorization denied.', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return sendError(res, 'User not found.', 401);
    }

    // Attach user to request
    req.user = user;
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return sendError(res, 'Invalid token.', 401);
    }
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'Token expired.', 401);
    }
    return sendError(res, 'Authentication failed.', 401);
  }
};

