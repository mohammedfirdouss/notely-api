import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((val: any) => val.message);
    return errorResponse(res, errors.join(', '), 400);
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return errorResponse(res, `${field} already exists`, 400);
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (error.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  // Default error
  return errorResponse(res, error.message || 'Internal server error', 500);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};
