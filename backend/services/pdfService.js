import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const pdfService = {
  extractTextFromPdf: async (filePath) => {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`PDF file not found: ${filePath}`);
      }
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      console.error("Error parsing PDF:", error);
      throw new Error("Failed to parse PDF file.");
    }
  },
};

export default pdfService;
