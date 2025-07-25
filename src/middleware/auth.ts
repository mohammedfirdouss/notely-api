import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { User } from '../models/User';
import { errorResponse } from '../utils/response';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Access token required', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return errorResponse(res, 'User not found', 401);
      }
      
      req.user = user;
      next();
    } catch (error) {
      return errorResponse(res, 'Invalid or expired token', 401);
    }
  } catch (error) {
    return errorResponse(res, 'Authentication error', 500);
  }
};
