import { Request, Response } from 'express';
import { DataStore } from '../services/dataStore.js';

export class EducationController {
  static async getArticles(req: Request, res: Response): Promise<void> {
    try {
      const { category, lang } = req.query;
      const articles = await DataStore.education.getAll(category as string, (lang as string) || 'en');
      res.json({ articles });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to retrieve education materials.' });
    }
  }

  static async getArticleBySlug(req: Request, res: Response): Promise<void> {
    try {
      const slug = String(req.params.slug);
      const article = await DataStore.education.getBySlug(slug);

      if (!article) {
        res.status(404).json({ error: 'Education guide not found.' });
        return;
      }

      res.json({ article });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch article details.' });
    }
  }
}
