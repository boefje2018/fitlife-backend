import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { error: 'Too many requests' } });
app.use('/api', limiter);

app.get('/health', (_, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import foodRoutes from './routes/food.routes';
import mealRoutes from './routes/meal.routes';
import exerciseRoutes from './routes/exercise.routes';
import workoutRoutes from './routes/workout.routes';
import aiRoutes from './routes/ai.routes';
import premiumRoutes from './routes/premium.routes';
import socialRoutes from './routes/social.routes';
import adminRoutes from './routes/admin.routes';
import notificationRoutes from './routes/notification.routes';
import analyticsRoutes from './routes/analytics.routes';
import { errorHandler } from './middleware/errorHandler';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/premium', premiumRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`FitLife API running on port ${PORT}`));
