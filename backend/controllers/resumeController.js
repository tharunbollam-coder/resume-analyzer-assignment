import pdfService from '../services/pdfService.js';
import geminiService from '../services/geminiService.js';
import dbService from '../services/dbService.js';
import fs from 'fs';

export const analyzeResume = async (req, res) => {
    let filePath;
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded.' });
        }

        filePath = req.file.path;
        const fileName = req.file.originalname;

        // 1. Extract text from PDF
        const rawText = await pdfService.extractTextFromPdf(filePath);

        // 2. Send text to Gemini LLM for analysis
        const structuredData = await geminiService.analyzeResumeText(rawText);

        // 3. Store in database
        const dbResult = dbService.insertResumeAnalysis(fileName, JSON.stringify(structuredData));

        res.status(200).json({
            message: 'Resume analyzed successfully',
            data: structuredData,
            dbId: dbResult.lastInsertRowid
        });
    } catch (error) {
        console.error('Error analyzing resume:', error);
        res.status(500).json({
            error: 'Failed to analyze resume.'
        });
    } finally {
        // Clean up the uploaded file if it exists
        if (filePath && fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (cleanupErr) {
                console.error('Error cleaning up uploaded file:', cleanupErr);
            }
        }
    }
};

export const getHistoricalResumes = (req, res) => {
    try {
        const resumes = dbService.getAllResumes();
        res.status(200).json(resumes);
    } catch (error) {
        console.error('Error fetching historical resumes:', error);
        res.status(500).json({ error: 'Failed to fetch historical data.' });
    }
};

export const getResumeById = (req, res) => {
    try {
        const { id } = req.params;
        const resume = dbService.getResumeById(id);
        if (resume) {
            // Parse the JSON string before sending
            const parsedData = JSON.parse(resume.data);
            res.status(200).json({ ...resume, data: parsedData });
        } else {
            res.status(404).json({ error: 'Resume not found.' });
        }
    } catch (error) {
        console.error('Error fetching resume by ID:', error);
        res.status(500).json({ error: 'Failed to fetch resume details.' });
    }
};