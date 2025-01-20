import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';
import { User } from '../../../shared/types/auth';

export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    req.user = { email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}; 