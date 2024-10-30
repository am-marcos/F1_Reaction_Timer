import { Router } from 'express';
import { submitReactionTimeController, getReactionTimesController } from '../controllers/timerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/submit-reaction-time', authMiddleware, submitReactionTimeController);
router.get('/get-reaction-times/:userId', authMiddleware, getReactionTimesController);

export default router;