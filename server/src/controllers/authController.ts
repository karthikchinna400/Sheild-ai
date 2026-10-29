import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DataStore } from '../services/dataStore.js';
import { AuthRequest } from '../middleware/auth.js';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ error: 'Name, email, and password are required fields.' });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ error: 'Password must be at least 6 characters in length.' });
        return;
      }

      const existing = await DataStore.users.findByEmail(email);
      if (existing) {
        res.status(409).json({ error: 'An account with this email address already exists.' });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await DataStore.users.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
      });

      const secret = process.env.JWT_SECRET || 'scamshield_secure_jwt_secret_token_defense_platform_key_2025';
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        secret,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Account successfully registered.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Registration failed.' });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required.' });
        return;
      }

      const user = await DataStore.users.findByEmail(email);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }

      const secret = process.env.JWT_SECRET || 'scamshield_secure_jwt_secret_token_defense_platform_key_2025';
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        secret,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Login failed.' });
    }
  }

  static async getMe(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Not authenticated.' });
        return;
      }

      const user = await DataStore.users.findById(req.user.id);
      if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }

      res.json({ user });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve user profile.' });
    }
  }
}

