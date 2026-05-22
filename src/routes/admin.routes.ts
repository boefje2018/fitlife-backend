import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === 'admin@fitlife.com' && password === 'admin123') {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: 'admin', isAdmin: true }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

router.get('/stats', (req, res) => {
  res.json({ totalUsers: 12847, activeUsers: 3421, premiumUsers: 2156, monthlyRevenue: 18430, dau: 3421, mau: 8247, retention: 68 });
});

router.get('/revenue', (req, res) => {
  res.json({ total: 124430, mrr: 18430, arpu: 8.54, pending: 2340, transactions: [] });
});

router.get('/users', (req, res) => {
  res.json(Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}`, email: `user${i + 1}@example.com`, status: i % 5 === 0 ? 'Inactive' : 'Active', premium: i % 3 === 0 ? 'Monthly' : i % 4 === 0 ? 'Yearly' : 'None', joined: `2024-01-${String(10 + (i % 20)).padStart(2, '0')}` })));
});

router.get('/foods', (req, res) => {
  res.json(Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: ['Chicken Breast', 'Brown Rice', 'Banana', 'Greek Yogurt', 'Egg', 'Salmon', 'Avocado', 'Sweet Potato', 'Almonds', 'Spinach'][i % 10], category: ['Protein', 'Carbs', 'Fruit', 'Dairy', 'Protein', 'Protein', 'Fruit', 'Carbs', 'Nuts', 'Vegetable'][i % 10], calories: [165, 216, 105, 100, 78, 208, 160, 114, 164, 23][i % 10], verified: i % 4 !== 0 })));
});

router.get('/exercises', (req, res) => {
  res.json([
    { id: 1, name: 'Running', category: 'Cardio', muscleGroup: 'Full Body', calPerMin: 10 },
    { id: 2, name: 'Bench Press', category: 'Strength', muscleGroup: 'Chest', calPerMin: 5 },
    { id: 3, name: 'Squat', category: 'Strength', muscleGroup: 'Legs', calPerMin: 7 },
  ]);
});

router.get('/subscriptions', (req, res) => {
  res.json([]);
});

export default router;
