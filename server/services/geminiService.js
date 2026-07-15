import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Gemini client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const analyzeResume = async (resumeText, jobDescription) => {
    const prompt = `
    You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
    I will provide you with a resume text and a job description.
    Your task is to analyze the resume against the job description and return ONLY a valid JSON object. Do not include markdown formatting or backticks around the JSON.
    
    Resume Text:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    Return the response strictly in this exact JSON format:
    {
      "atsScore": 0, // A number from 0 to 100 representing the match percentage
      "summary": "", // A brief summary of the candidate's fit for the role
      "strengths": [], // Array of strings (candidate's strengths)
      "weaknesses": [], // Array of strings (candidate's weaknesses)
      "missingSkills": [], // Array of strings (skills missing from resume but in JD)
      "missingKeywords": [], // Array of strings (keywords missing from resume but in JD)
      "grammarSuggestions": [], // Array of strings (grammar improvements)
      "formattingSuggestions": [], // Array of strings (formatting improvements)
      "improvements": [], // Array of strings (suggestions to improve the resume)
      "recommendedRoles": [], // Array of strings (other roles candidate might fit)
      "overallFeedback": "" // A paragraph summarizing the overall feedback
    }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        let text = response.text;
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error(error.message || "Failed to analyze resume with Gemini AI.");
    }
};
