import { Router } from 'express';
import { ScanController } from '../controllers/scanController.js';
import { optionalAuth, authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/', optionalAuth, ScanController.createScan);
router.get('/', optionalAuth, ScanController.getScans);
router.get('/:id', optionalAuth, ScanController.getScanById);
router.delete('/:id', authenticateToken, ScanController.deleteScan);

export default router;

