import { Request, Response } from 'express';
import { User } from '../models/User';
import { createTokenResponse } from '../utils/jwt';
import { successResponse, errorResponse, asyncHandler } from '../utils/response';
import { RegisterData, LoginCredentials } from '../types';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password }: RegisterData = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return errorResponse(res, 'User with this email or username already exists', 400);
  }

  // Create new user
  const user = new User({
    username,
    email,
    password
  });

  await user.save();

  // Return token response
  const tokenResponse = createTokenResponse(user);
  return successResponse(res, tokenResponse.data, 'User registered successfully', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: LoginCredentials = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return errorResponse(res, 'Invalid email or password', 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return errorResponse(res, 'Invalid email or password', 401);
  }

  // Return token response
  const tokenResponse = createTokenResponse(user);
  return successResponse(res, tokenResponse.data, 'Login successful');
});

export const getProfile = asyncHandler(async (req: any, res: Response) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  return successResponse(res, {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }, 'Profile retrieved successfully');
});
