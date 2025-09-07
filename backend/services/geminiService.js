import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const geminiService = {
    analyzeResumeText: async (text) => {
        try {
            const prompt = `
            You are an expert resume analyst. Analyze the following resume text and provide a structured JSON output.
            
            The JSON MUST have the following keys. If a key's information is not found, use an empty string or an empty array.
            
            {
              "personalDetails": {
                "name": "string",
                "email": "string",
                "phone": "string",
                "linkedin_portfolio": "string"
              },
              "resumeContent": {
                "summary": "string",
                "workExperience": [
                  {
                    "title": "string",
                    "company": "string",
                    "duration": "string",
                    "responsibilities": ["string", "string"]
                  }
                ],
                "education": [
                  {
                    "degree": "string",
                    "institution": "string",
                    "duration": "string"
                  }
                ],
                "projects": [
                  {
                    "name": "string",
                    "description": "string"
                  }
                ],
                "certifications": ["string", "string"]
              },
              "skills": {
                "technicalSkills": ["string", "string"],
                "softSkills": ["string", "string"]
              },
              "aiFeedback": {
                "rating": "number (1-10)",
                "improvementSuggestions": ["string", "string"],
                "upskillingAreas": ["string", "string"]
              }
            }
            
            Here is the resume text to analyze:
            
            "${text}"
            
            Provide ONLY the JSON object, with no additional text or markdown formatting. The JSON must be a single block of text. Ensure all property names are double-quoted and strictly adhere to JSON standards.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const textResponse = response.text().trim();

            // The API sometimes returns a code block, so we need to clean it up
            let cleanedText = textResponse.replace(/^```json\s*|^\s*```/g, '').trim();

            // Attempt to fix common JSON issues that LLMs might introduce
            // This is a basic attempt; more sophisticated parsing might be needed if the issues persist
            cleanedText = cleanedText.replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']'); // Remove trailing commas
            // Further cleaning can be added here if other patterns of malformed JSON are observed

            console.log("Gemini raw cleaned response:", cleanedText);

            return JSON.parse(cleanedText);

        } catch (error) {
            console.error('Error communicating with Gemini API:', error);
            throw new Error('Failed to analyze resume with AI. Details: ' + error.message);
        }
    }
};

export default geminiService;