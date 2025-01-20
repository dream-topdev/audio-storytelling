import { Router } from 'express';
import { login, signup, verify } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', authMiddleware, verify);

export default router; 