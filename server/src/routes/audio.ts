import { Router } from 'express';

import { getTracks } from '../controllers/audioController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/tracks', authMiddleware, getTracks);

export default router; 