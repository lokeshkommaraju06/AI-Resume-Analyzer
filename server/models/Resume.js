import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    extractedText: { type: String, required: true },
    atsScore: { type: Number, required: true },
    summary: { type: String },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    missingSkills: [{ type: String }],
    missingKeywords: [{ type: String }],
    grammarSuggestions: [{ type: String }],
    formattingSuggestions: [{ type: String }],
    improvements: [{ type: String }],
    recommendedRoles: [{ type: String }],
    overallFeedback: { type: String },
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
