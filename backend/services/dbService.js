import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, 'resume_analyzer.db');

const db = new Database(dbPath, { verbose: console.log });

const dbService = {
    initDb: () => {
        const createTableStmt = `
        CREATE TABLE IF NOT EXISTS resumes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            data TEXT NOT NULL,
            uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `;
        db.exec(createTableStmt);
    },

    insertResumeAnalysis: (filename, data) => {
        const insertStmt = db.prepare(`
        INSERT INTO resumes (filename, data) VALUES (?, ?)
        `);
        return insertStmt.run(filename, data);
    },

    getAllResumes: () => {
        const selectStmt = db.prepare(`
        SELECT id, filename, json_extract(data, '$.personalDetails.name') as name, json_extract(data, '$.personalDetails.email') as email, uploaded_at
        FROM resumes
        ORDER BY uploaded_at DESC
        `);
        return selectStmt.all();
    },

    getResumeById: (id) => {
        const selectStmt = db.prepare(`
        SELECT * FROM resumes WHERE id = ?
        `);
        return selectStmt.get(id);
    }
};

export default dbService;