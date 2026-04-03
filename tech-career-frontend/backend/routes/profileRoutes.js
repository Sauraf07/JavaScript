import express from 'express';
import { createProfile, getProfile } from '../controllers/profileController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
router.post('/create', verifyToken, createProfile);
router.get('/:userId', verifyToken, getProfile);
export default router;