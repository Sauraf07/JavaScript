import express from 'express';
import { getPaths, selectCareer } from '../controllers/careerController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
router.get('/paths', getPaths);
router.post('/select', verifyToken, selectCareer);
export default router;