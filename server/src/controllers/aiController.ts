import { Request, Response } from 'express';
import { AIService } from '../services/aiService.js';

export class AIController {
  static async analyzeMessage(req: Request, res: Response): Promise<void> {
    try {
      const { content, metadata } = req.body;
      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        res.status(400).json({ error: 'Please enter a message to analyze.' });
        return;
      }

      const result = await AIService.analyze({
        content: content.trim(),
        scanType: 'message',
        metadata,
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Unable to analyze message at this moment.' });
    }
  }

  static async analyzeUrl(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string' || url.trim().length === 0) {
        res.status(400).json({ error: 'Please enter a valid web URL.' });
        return;
      }

      const result = await AIService.analyze({
        content: url.trim(),
        scanType: 'url',
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Unable to inspect URL at this moment.' });
    }
  }

  static async analyzeImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'Please upload an image or screenshot file (PNG, JPG, WEBP).' });
        return;
      }

      const result = await AIService.analyze({
        content: req.body.extractedText || 'Screenshot scan',
        scanType: 'screenshot',
        imageBuffer: req.file.buffer,
        imageMimeType: req.file.mimetype,
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Image analysis failed. Please ensure file is under 10MB.' });
    }
  }

  static async analyzeJob(req: Request, res: Response): Promise<void> {
    try {
      const { content } = req.body;
      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        res.status(400).json({ error: 'Please provide job or internship offer details to analyze.' });
        return;
      }

      const result = await AIService.analyze({
        content: content.trim(),
        scanType: 'job',
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Unable to evaluate job offer right now.' });
    }
  }

  static async analyzePayment(req: Request, res: Response): Promise<void> {
    try {
      const { content } = req.body;
      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        res.status(400).json({ error: 'Please enter the payment request or UPI transaction message.' });
        return;
      }

      const result = await AIService.analyze({
        content: content.trim(),
        scanType: 'payment',
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Unable to evaluate payment request right now.' });
    }
  }
}

