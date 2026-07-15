import express from 'express';
import { analyzeResume, getHistory, getHistoryById, deleteHistoryById } from '../controllers/resumeController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/analyze', upload.single('resume'), analyzeResume);
router.get('/history', getHistory);
router.get('/history/:id', getHistoryById);
router.delete('/history/:id', deleteHistoryById);

export default router;
