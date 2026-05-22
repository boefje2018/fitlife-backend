import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/dashboard', authenticate, (req: AuthRequest, res: Response) => {
  res.json({
    dailyCalorieGoal: 2200,
    caloriesConsumed: 1850,
    caloriesBurned: 450,
    protein: 95, proteinGoal: 150,
    carbs: 180, carbsGoal: 250,
    fat: 55, fatGoal: 73,
    water: 1500, waterGoal: 2500,
    steps: 7800, stepsGoal: 10000,
    weight: 72.5, weightChange: -0.3,
    bmi: 23.7,
    streak: 7
  });
});

router.get('/weekly', authenticate, (req: AuthRequest, res: Response) => {
  res.json({
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    calories: [1950, 2100, 1800, 2200, 1900, 2000, 1850],
    protein: [120, 135, 110, 140, 125, 130, 95],
    workouts: [45, 0, 50, 0, 30, 60, 0]
  });
});

export default router;
