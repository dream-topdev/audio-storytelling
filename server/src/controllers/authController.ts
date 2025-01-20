import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, COOKIE_OPTIONS } from '../config/constants';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      email,
      password: hashedPassword
    });

    await userRepository.save(user);

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, COOKIE_OPTIONS);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, COOKIE_OPTIONS);

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      ...COOKIE_OPTIONS,
      maxAge: 0,
      expires: new Date(0)
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error during logout' });
  }
};

export const verify = async (req: Request, res: Response) => {
  res.json({ message: 'Token is valid' });
}; 