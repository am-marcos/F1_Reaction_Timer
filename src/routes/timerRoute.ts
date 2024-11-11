import { Router } from 'express';
import { submitReactionTimeController, getReactionTimesController } from '../controllers/timerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/reaction-time/submit-reaction-time:
 *   post:
 *     summary: Submit a reaction time
 *     tags: [Reaction Time]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               time:
 *                 type: number
 *     responses:
 *       201:
 *         description: Reaction time submitted successfully
 *       400:
 *         description: Bad request
 */
router.post('/submit-reaction-time', authMiddleware, submitReactionTimeController);

/**
 * @swagger
 * /api/reaction-time/get-reaction-time/{userId}:
 *   get:
 *     summary: Get reaction times for a user
 *     tags: [Reaction Time]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of reaction times
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   time:
 *                     type: number
 *       400:
 *         description: Bad request
 */
router.get('/get-reaction-time/:userId', authMiddleware, getReactionTimesController);

export default router;