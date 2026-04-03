import express from 'express';
import { generateRoadmap, getRoadmap } from '../controllers/roadmapController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
router.post('/generate', verifyToken, generateRoadmap);
router.get('/:userId', verifyToken, getRoadmap);
export default router;