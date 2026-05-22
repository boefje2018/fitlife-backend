import { Router, Request, Response } from 'express';

const router = Router();

const exercises = [
  { id: 1, name: 'Running', category: 'Cardio', muscleGroup: 'Full Body', caloriesPerMinute: 10 },
  { id: 2, name: 'Bench Press', category: 'Strength', muscleGroup: 'Chest', caloriesPerMinute: 5 },
  { id: 3, name: 'Squat', category: 'Strength', muscleGroup: 'Legs', caloriesPerMinute: 7 },
  { id: 4, name: 'Cycling', category: 'Cardio', muscleGroup: 'Legs', caloriesPerMinute: 8 },
  { id: 5, name: 'Deadlift', category: 'Strength', muscleGroup: 'Back', caloriesPerMinute: 6 },
  { id: 6, name: 'Yoga', category: 'Flexibility', muscleGroup: 'Full Body', caloriesPerMinute: 3 },
  { id: 7, name: 'Jump Rope', category: 'Cardio', muscleGroup: 'Full Body', caloriesPerMinute: 12 },
  { id: 8, name: 'Pull Up', category: 'Strength', muscleGroup: 'Back', caloriesPerMinute: 4 },
];

router.get('/', (req: Request, res: Response) => {
  const q = (req.query.q as string || '').toLowerCase();
  const cat = req.query.category as string;
  let result = q ? exercises.filter(e => e.name.toLowerCase().includes(q)) : exercises;
  if (cat) result = result.filter(e => e.category.toLowerCase() === cat.toLowerCase());
  res.json(result);
});

router.get('/:id', (req: Request, res: Response) => {
  const ex = exercises.find(e => e.id === parseInt(req.params.id));
  if (!ex) return res.status(404).json({ error: 'Exercise not found' });
  res.json(ex);
});

export default router;
