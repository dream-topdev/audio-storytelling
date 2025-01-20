import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, COOKIE_OPTIONS } from '../config/constants';
import { User } from '../../../shared/types/auth';

export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    req.user = { email: decoded.email };
    next();
  } catch (error) {
    res.clearCookie('token', {
      ...COOKIE_OPTIONS,
      maxAge: 0,
      expires: new Date(0)
    });
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}; 