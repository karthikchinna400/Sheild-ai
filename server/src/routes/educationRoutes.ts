import { Router } from 'express';
import { EducationController } from '../controllers/educationController.js';

const router = Router();

router.get('/', EducationController.getArticles);
router.get('/:slug', EducationController.getArticleBySlug);

export default router;

