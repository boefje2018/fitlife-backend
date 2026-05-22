import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const meals: Record<string, any[]> = {};

router.get('/', authenticate, (req: AuthRequest, res: Response) => {
  const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
  const userMeals = meals[`${req.userId}-${date}`] || [];
  res.json(userMeals);
});

router.post('/', authenticate, (req: AuthRequest, res: Response) => {
  const { type, foods, date } = req.body;
  const mealDate = date || new Date().toISOString().split('T')[0];
  const key = `${req.userId}-${mealDate}`;
  if (!meals[key]) meals[key] = [];
  const meal = { id: Date.now(), type, foods, date: mealDate, ...req.body };
  meals[key].push(meal);
  res.status(201).json(meal);
});

router.delete('/:id', authenticate, (req: AuthRequest, res: Response) => {
  for (const key of Object.keys(meals)) {
    meals[key] = meals[key].filter(m => m.id !== parseInt(req.params.id));
  }
  res.json({ message: 'Deleted' });
});

export default router;
