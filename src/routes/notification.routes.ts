import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, (req: AuthRequest, res: Response) => {
  res.json([
    { id: 1, title: 'Time to Log Lunch', body: 'Don\'t forget to log your lunch!', type: 'meal', isRead: false, createdAt: new Date() },
    { id: 2, title: 'Workout Reminder', body: 'You have a workout scheduled for today', type: 'workout', isRead: false, createdAt: new Date() },
    { id: 3, title: 'Streak Alert', body: 'You\'re on a 7-day streak! Keep going!', type: 'streak', isRead: true, createdAt: new Date() },
  ]);
});

router.put('/:id/read', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ message: 'Marked as read' });
});

router.put('/read-all', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ message: 'All marked as read' });
});

export default router;
