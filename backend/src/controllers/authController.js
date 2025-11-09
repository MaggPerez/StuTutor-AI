/**
 * Authentication controller
 * Manages registration, login, password hashing, and JWT issuance
 */

import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return sendError(res, 'Please provide username, email, and password.', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return sendError(res, 'User with this email or username already exists.', 400);
    }

    // Create user (password will be hashed by pre-save hook)
    const user = await User.create({
      username,
      email,
      password,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    return sendSuccess(res, {
      message: 'User registered successfully.',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    }, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendError(res, 'Please provide email and password.', 400);
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email });

    if (!user) {
      return sendError(res, 'Invalid credentials.', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return sendError(res, 'Invalid credentials.', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    return sendSuccess(res, {
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

