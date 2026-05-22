import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const profiles: Record<string, any> = {};

router.get('/profile', authenticate, (req: AuthRequest, res: Response) => {
  res.json(profiles[req.userId!] || { name: 'User', email: 'user@example.com', height: 175, weight: 70, age: 25, gender: 'male', goal: 'maintain', activityLevel: 'moderate' });
});

router.put('/profile', authenticate, (req: AuthRequest, res: Response) => {
  profiles[req.userId!] = { ...profiles[req.userId!], ...req.body };
  res.json(profiles[req.userId!]);
});

router.get('/stats', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ streak: 7, totalMeals: 42, totalWorkouts: 18, totalCaloriesBurned: 12500, achievements: 5 });
});

export default router;
