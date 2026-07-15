import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
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
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an expert AI Resume Analyzer. You always respond with raw, valid JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw new Error("Failed to analyze resume with AI.");
    }
};
