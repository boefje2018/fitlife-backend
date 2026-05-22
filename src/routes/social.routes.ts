import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/friends', authenticate, (req: AuthRequest, res: Response) => {
  res.json([{ id: 1, name: 'John D.', streak: 12, avatar: null }, { id: 2, name: 'Sarah M.', streak: 8, avatar: null }]);
});

router.get('/leaderboard', authenticate, (req: AuthRequest, res: Response) => {
  res.json({
    weekly: [{ rank: 1, name: 'Alice', points: 2850 }, { rank: 2, name: 'Bob', points: 2430 }, { rank: 3, name: 'Charlie', points: 2100 }],
    monthly: [{ rank: 1, name: 'Alice', points: 12400 }, { rank: 2, name: 'Dave', points: 11800 }, { rank: 3, name: 'Bob', points: 10500 }]
  });
});

router.get('/achievements', authenticate, (req: AuthRequest, res: Response) => {
  res.json([
    { id: 1, name: 'First Steps', description: 'Complete your first workout', icon: '🏃', unlocked: true, progress: 100 },
    { id: 2, name: '7-Day Streak', description: 'Log meals for 7 days straight', icon: '🔥', unlocked: true, progress: 100 },
    { id: 3, name: 'Protein King', description: 'Hit protein goal for 30 days', icon: '💪', unlocked: false, progress: 60 },
    { id: 4, name: 'Marathon', description: 'Complete 50 workouts', icon: '🏅', unlocked: false, progress: 36 },
  ]);
});

export default router;
