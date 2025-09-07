import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resume.js';
import dbService from './services/dbService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: 'https://resume-analyzer-assignment-sigma.vercel.app/' }));
} else {
  app.use(cors()); // open in dev
}
app.use(express.json());

// Routes
app.use('/api', resumeRoutes);

// Initialize database
dbService.initDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});