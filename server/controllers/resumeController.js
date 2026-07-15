import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import Resume from '../models/Resume.js';
import { analyzeResume as aiAnalyze } from '../services/geminiService.js';

export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded.' });
        }

        const { jobDescription } = req.body;
        if (!jobDescription) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Job description is required.' });
        }

        // Parse PDF
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer);
        const extractedText = data.text;

        // Call Gemini Service
        const analysisResult = await aiAnalyze(extractedText, jobDescription);

        // Save to Database
        const newResume = new Resume({
            filename: req.file.originalname,
            extractedText,
            ...analysisResult
        });

        await newResume.save();

        // Delete the file after successful processing
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: 'Resume analyzed successfully',
            data: newResume
        });

    } catch (error) {
        console.error('Error in analyzeResume:', error);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: error.message || 'An error occurred during resume analysis.' });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await Resume.find().sort({ createdAt: -1 }).select('-extractedText');
        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history.' });
    }
};

export const getHistoryById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ error: 'Resume analysis not found.' });
        }
        res.status(200).json(resume);
    } catch (error) {
        console.error('Error fetching history item:', error);
        res.status(500).json({ error: 'Failed to fetch history item.' });
    }
};

export const deleteHistoryById = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (!resume) {
            return res.status(404).json({ error: 'Resume analysis not found.' });
        }
        res.status(200).json({ message: 'History item deleted successfully.' });
    } catch (error) {
        console.error('Error deleting history item:', error);
        res.status(500).json({ error: 'Failed to delete history item.' });
    }
};
