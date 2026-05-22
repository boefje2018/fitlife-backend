import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { generateToken } from '../middleware/auth';

const router = Router();

// In-memory store (replace with database in production)
const users: any[] = [];

router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), email, password: hashed, name, height: 175, weight: 70, age: 25, gender: 'male', goal: 'maintain', activityLevel: 'moderate', isPremium: false, isAdmin: false, createdAt: new Date() };
  users.push(user);
  const token = generateToken(user.id);
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(user.id);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, isPremium: user.isPremium } });
});

router.post('/google', (req: Request, res: Response) => {
  const { email, name, googleId } = req.body;
  let user = users.find(u => u.googleId === googleId || u.email === email);
  if (!user) {
    user = { id: uuidv4(), email, name, googleId, password: '', isPremium: false, isAdmin: false, createdAt: new Date() };
    users.push(user);
  }
  res.json({ token: generateToken(user.id), user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/apple', (req: Request, res: Response) => {
  const { email, name, appleId } = req.body;
  let user = users.find(u => u.appleId === appleId);
  if (!user) {
    user = { id: uuidv4(), email, name, appleId, password: '', isPremium: false, isAdmin: false, createdAt: new Date() };
    users.push(user);
  }
  res.json({ token: generateToken(user.id), user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/forgot-password', (req: Request, res: Response) => {
  res.json({ message: 'If the email exists, a reset link has been sent.' });
});

export default router;
