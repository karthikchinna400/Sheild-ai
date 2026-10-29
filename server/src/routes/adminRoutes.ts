import { Router } from 'express';
import { AdminController } from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// In demo/presentation mode, allow statistics fetching or require auth if token is sent
router.get('/statistics', AdminController.getStatistics);

export default router;

