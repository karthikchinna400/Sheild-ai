import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { DataStore } from '../services/dataStore.js';

export class AdminController {
  static async getStatistics(req: AuthRequest, res: Response): Promise<void> {
    try {
      const totalUsers = await DataStore.users.count();
      const totalReports = await DataStore.reports.count();
      const analytics = await DataStore.scans.getAnalytics();

      res.json({
        totalUsers,
        totalReports,
        ...analytics,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to aggregate administrative metrics.' });
    }
  }
}

