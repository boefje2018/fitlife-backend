import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const workouts: Record<string, any[]> = {};

router.get('/', authenticate, (req: AuthRequest, res: Response) => {
  res.json(workouts[req.userId!] || []);
});

router.post('/', authenticate, (req: AuthRequest, res: Response) => {
  if (!workouts[req.userId!]) workouts[req.userId!] = [];
  const workout = { id: Date.now(), date: new Date(), ...req.body };
  workouts[req.userId!].push(workout);
  res.status(201).json(workout);
});

router.get('/history', authenticate, (req: AuthRequest, res: Response) => {
  res.json(workouts[req.userId!] || []);
});

export default router;
