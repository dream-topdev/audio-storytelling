import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, COOKIE_OPTIONS } from '../config/constants';
import { User } from '../../../shared/types/auth';

// In-memory user storage (replace with proper database in production)
const users: { [key: string]: User & { password: string } } = {};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (users[email]) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = { email, password: hashedPassword };

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, COOKIE_OPTIONS);
  res.status(201).json({ message: 'User created successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users[email];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, COOKIE_OPTIONS);
  
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

export const verify = async (req: Request, res: Response) => {
  res.json({ message: 'Token is valid' });
}; 