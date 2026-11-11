import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    _id: string;
    name: string;
    email: string;
    role: 'resident' | 'volunteer' | 'admin';
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'kuntamukkala_secret_jwt_key_2026';

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'] as string;
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({ error: 'Access denied. Authorization token missing.' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findById(decoded.id).select('-passwordHash');

    if (!user) {
      res.status(401).json({ error: 'User account no longer exists.' });
      return;
    }

    req.user = {
      id: user._id.toString(),
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired authorization token.' });
    return;
  }
};

export const requireRole = (allowedRoles: Array<'resident' | 'volunteer' | 'admin'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: `Permission denied. Access limited to roles: ${allowedRoles.join(', ')}.`,
      });
      return;
    }

    next();
  };
};
