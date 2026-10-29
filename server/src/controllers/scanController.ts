import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { DataStore } from '../services/dataStore.js';

export class ScanController {
  static async createScan(req: AuthRequest, res: Response): Promise<void> {
    try {
      const {
        scanType,
        riskScore,
        riskLevel,
        confidence,
        scamCategory,
        summary,
        redFlags,
        evidence,
        recommendations,
        inputPreview,
        needsVerification,
      } = req.body;

      if (!scanType || riskScore === undefined || !riskLevel) {
        res.status(400).json({ error: 'Missing required scan metrics.' });
        return;
      }

      // Sanitize input preview to guarantee zero storage of passwords or OTPs
      const safePreview = (inputPreview || '').substring(0, 150).replace(/(\d{6}|\b\d{4}\b)/g, '******');

      const scan = await DataStore.scans.create({
        userId: req.user?.id || undefined,
        scanType,
        riskScore: Number(riskScore),
        riskLevel,
        confidence: Number(confidence) || 90,
        scamCategory: scamCategory || 'Digital Threat',
        summary: summary || 'Analysis report',
        redFlags: redFlags || [],
        evidence: evidence || [],
        recommendations: recommendations || [],
        inputPreview: safePreview,
        needsVerification: Boolean(needsVerification),
      });

      res.status(201).json({ message: 'Scan result saved successfully.', scan });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to record scan report.' });
    }
  }

  static async getScans(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { scanType, riskLevel } = req.query;

      const filter: any = {};
      if (userId) filter.userId = userId;
      if (scanType) filter.scanType = scanType as string;
      if (riskLevel) filter.riskLevel = riskLevel as string;

      const scans = await DataStore.scans.find(filter);
      res.json({ scans });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch scan records.' });
    }
  }

  static async getScanById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const scan = await DataStore.scans.findById(id);

      if (!scan) {
        res.status(404).json({ error: 'Scan record not found.' });
        return;
      }

      res.json({ scan });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve scan details.' });
    }
  }

  static async deleteScan(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const userId = req.user?.id;

      const deleted = await DataStore.scans.delete(id, req.user?.role === 'admin' ? undefined : userId);
      if (!deleted) {
        res.status(404).json({ error: 'Scan not found or permission denied.' });
        return;
      }

      res.json({ message: 'Scan history entry deleted successfully.' });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete scan item.' });
    }
  }
}
