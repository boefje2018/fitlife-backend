import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/chat', authenticate, (req: Request, res: Response) => {
  const { message } = req.body;
  const responses = [
    "Based on your goals, I'd recommend increasing your protein intake to 150g per day.",
    "Great progress! Try adding 15 minutes of HIIT to boost your fat loss.",
    "Your calorie intake is right on track. Let's focus on meal timing next.",
    "For better recovery, aim for 8 hours of sleep and 2.5L of water daily.",
    "Consider cycling your carbs: higher on workout days, lower on rest days."
  ];
  res.json({ response: responses[Math.floor(Math.random() * responses.length)], timestamp: new Date().toISOString() });
});

router.post('/analyze-meal', authenticate, (req: Request, res: Response) => {
  res.json({ detectedFood: 'Grilled Chicken Salad', estimatedCalories: 350, protein: 35, carbs: 12, fat: 18, confidence: 0.89 });
});

router.post('/meal-suggestion', authenticate, (req: Request, res: Response) => {
  const { remainingCalories, remainingProtein, remainingCarbs, remainingFat } = req.body;
  res.json({
    suggestions: [
      { name: 'Grilled Chicken with Quinoa', calories: 450, protein: 40, carbs: 35, fat: 12, prepTime: '20 min' },
      { name: 'Salmon with Sweet Potato', calories: 420, protein: 35, carbs: 30, fat: 15, prepTime: '25 min' },
      { name: 'Greek Yogurt Bowl', calories: 300, protein: 25, carbs: 20, fat: 8, prepTime: '5 min' },
    ]
  });
});

router.post('/workout-plan', authenticate, (req: Request, res: Response) => {
  const { goal, daysPerWeek } = req.body;
  res.json({
    plan: `Here's your ${daysPerWeek || 4}-day ${goal || 'strength'} workout plan: Day 1: Upper Body Strength, Day 2: Lower Body, Day 3: Cardio & Core, Day 4: Full Body HIIT`,
    exercises: ['Bench Press 4x8', 'Squat 4x10', 'Deadlift 3x8', 'Pull Ups 3x10', 'Plank 3x45s']
  });
});

router.post('/weekly-report', authenticate, (req: Request, res: Response) => {
  res.json({
    weekStart: '2024-01-08', weekEnd: '2024-01-14',
    totalCaloriesConsumed: 14000, totalCaloriesBurned: 3500,
    averageDailyCalories: 2000, averageProtein: 120, averageCarbs: 200, averageFat: 65,
    workoutsCompleted: 4, totalWorkoutMinutes: 240,
    weightChange: -0.5, bodyFatChange: -0.3,
    recommendation: "Great week! Stay consistent with your workouts and watch your late-night snacking."
  });
});

router.post('/diet-recommendation', authenticate, (req: Request, res: Response) => {
  const { goal, weight, height, age, gender, activityLevel } = req.body;
  const bmr = gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
  const multipliers: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
  const tdee = bmr * (multipliers[activityLevel] || 1.55);
  const targetCalories = goal === 'lose_weight' ? tdee - 500 : goal === 'gain_weight' ? tdee + 500 : tdee;
  res.json({ bmr: Math.round(bmr), tdee: Math.round(tdee), targetCalories: Math.round(targetCalories), protein: Math.round(targetCalories * 0.3 / 4), carbs: Math.round(targetCalories * 0.4 / 4), fat: Math.round(targetCalories * 0.3 / 9) });
});

export default router;
