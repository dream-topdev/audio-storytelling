import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import audioRoutes from './routes/audio'
import { errorHandler } from './middleware/errorHandler';
import { CORS_OPTIONS } from './config/constants';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/audio', audioRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 