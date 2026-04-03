import express from 'express';
import { addSubject, getSubjects, filterImportant } from '../controllers/subjectController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
router.post('/add', verifyToken, addSubject);
router.get('/:userId', verifyToken, getSubjects);
router.post('/filter-important', verifyToken, filterImportant);
export default router;