import { Response } from 'express';
import crypto from 'crypto';
import { AuthRequest } from '../middleware/auth.js';
import { DataStore } from '../services/dataStore.js';

export class ReportController {
  static async createReport(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { reportType, targetIndicator, description, evidenceNotes } = req.body;

      if (!reportType || !targetIndicator) {
        res.status(400).json({ error: 'Report type and the suspicious indicator (phone, URL, etc.) are required.' });
        return;
      }

      // Generate privacy-preserving hash of the reported entity
      const contentHash = crypto.createHash('sha256').update(targetIndicator.trim().toLowerCase()).digest('hex');

      const report = await DataStore.reports.create({
        userId: req.user?.id,
        reportType,
        targetIndicator: targetIndicator.trim(),
        contentHash,
        description: description?.trim() || '',
        evidenceNotes: evidenceNotes?.trim() || '',
      });

      res.status(201).json({
        message: 'Thank you. Your scam report has been submitted to the moderation database.',
        report,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to submit report. Please try again later.' });
    }
  }

  static async getReports(req: AuthRequest, res: Response): Promise<void> {
    try {
      const reports = await DataStore.reports.find();
      res.json({ reports });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve community reports.' });
    }
  }
}

