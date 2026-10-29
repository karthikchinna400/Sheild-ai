import { Router } from 'express';
import { AIController } from '../controllers/aiController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/analyze-message', AIController.analyzeMessage);
router.post('/analyze-url', AIController.analyzeUrl);
router.post('/analyze-image', upload.single('image'), AIController.analyzeImage);
router.post('/analyze-job', AIController.analyzeJob);
router.post('/analyze-payment', AIController.analyzePayment);

export default router;

