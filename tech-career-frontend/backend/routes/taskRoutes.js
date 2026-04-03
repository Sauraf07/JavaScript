import express from 'express';
import { generateTasks, getTasks, completeTask } from '../controllers/taskController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
router.post('/generate', verifyToken, generateTasks);
router.get('/:userId', verifyToken, getTasks);
router.post('/complete', verifyToken, completeTask);
export default router;