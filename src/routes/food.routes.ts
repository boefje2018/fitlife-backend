import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

const foods = [
  { id: 1, name: 'Chicken Breast', category: 'Protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: 100, servingUnit: 'g', barcode: '123456789' },
  { id: 2, name: 'Brown Rice', category: 'Carbs', calories: 216, protein: 5, carbs: 45, fat: 1.8, servingSize: 100, servingUnit: 'g' },
  { id: 3, name: 'Banana', category: 'Fruit', calories: 105, protein: 1.3, carbs: 27, fat: 0.3, servingSize: 100, servingUnit: 'g' },
  { id: 4, name: 'Greek Yogurt', category: 'Dairy', calories: 100, protein: 10, carbs: 7, fat: 5, servingSize: 100, servingUnit: 'g' },
  { id: 5, name: 'Egg', category: 'Protein', calories: 78, protein: 6, carbs: 0.6, fat: 5, servingSize: 50, servingUnit: 'g' },
  { id: 6, name: 'Salmon', category: 'Protein', calories: 208, protein: 22, carbs: 0, fat: 13, servingSize: 100, servingUnit: 'g' },
  { id: 7, name: 'Avocado', category: 'Fruit', calories: 160, protein: 2, carbs: 9, fat: 15, servingSize: 100, servingUnit: 'g' },
  { id: 8, name: 'Sweet Potato', category: 'Carbs', calories: 114, protein: 2, carbs: 27, fat: 0, servingSize: 100, servingUnit: 'g' },
  { id: 9, name: 'Almonds', category: 'Nuts', calories: 164, protein: 6, carbs: 6, fat: 14, servingSize: 30, servingUnit: 'g' },
  { id: 10, name: 'Spinach', category: 'Vegetable', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, servingSize: 100, servingUnit: 'g' },
];

router.get('/', (req: Request, res: Response) => {
  const q = (req.query.q as string || '').toLowerCase();
  const results = q ? foods.filter(f => f.name.toLowerCase().includes(q)) : foods;
  res.json(results);
});

router.get('/:id', (req: Request, res: Response) => {
  const food = foods.find(f => f.id === parseInt(req.params.id));
  if (!food) return res.status(404).json({ error: 'Food not found' });
  res.json(food);
});

router.get('/barcode/:barcode', (req: Request, res: Response) => {
  const food = foods.find(f => f.barcode === req.params.barcode);
  if (!food) return res.status(404).json({ error: 'Food not found' });
  res.json(food);
});

router.post('/', authenticate, (req: Request, res: Response) => {
  const food = { id: foods.length + 1, ...req.body };
  foods.push(food);
  res.status(201).json(food);
});

router.post('/scan', authenticate, (req: Request, res: Response) => {
  const { image } = req.body;
  res.json({ detectedFood: 'Chicken Breast', estimatedCalories: 165, confidence: 0.92, servingSize: 100 });
});

export default router;
