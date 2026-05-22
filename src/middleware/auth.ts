import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
  userId?: string;
  isAdmin?: boolean;
}

export function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new AppError('Authentication required', 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}

export function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin;
    } catch {}
  }
  next();
}

export function requireAdmin(req: AuthRequest, _res: Response, next: NextFunction) {
  if (!req.isAdmin) throw new AppError('Admin access required', 403);
  next();
}

export function generateToken(userId: string, isAdmin: boolean = false): string {
  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];
  return jwt.sign({ id: userId, isAdmin }, process.env.JWT_SECRET || 'secret', { expiresIn });
}
