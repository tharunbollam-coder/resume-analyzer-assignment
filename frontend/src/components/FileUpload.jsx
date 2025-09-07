import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

function FileUpload({ onAnalysisResult, onAnalysisError, onLoadingState }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      onAnalysisError('Please select a PDF file to upload.');
      return;
    }

    if (file.type !== 'application/pdf') {
      onAnalysisError('Invalid file type. Please upload a PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setLoading(true);
    onLoadingState(true);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Always show a generic error message for backend errors
        throw new Error('Failed to analyze resume. Please try again later.');
      }

      const data = await response.json();
      onAnalysisResult(data.data);
    } catch (error) {
      // Show a generic error for network/backend issues
      onAnalysisError('An error occurred while analyzing your resume. Please try again.');
    } finally {
      setLoading(false);
      onLoadingState(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded-2xl shadow-lg bg-white max-w-xl mx-auto w-full">
      <div className="flex flex-col items-center justify-center space-y-4">
        <label htmlFor="file-upload" className="block text-base font-semibold text-gray-700 mb-2">
          Upload your resume (PDF only)
        </label>
        {/* Drag and drop area */}
        <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-xl p-6 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 cursor-pointer" onClick={() => document.getElementById('file-upload').click()}>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span className="text-gray-500 text-sm">Click or drag a PDF file here</span>
          {file && <span className="text-blue-700 text-sm mt-2 font-medium">Selected: {file.name}</span>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-8 py-2 border border-transparent text-base font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed mt-4 transition-all duration-200"
        >
          {loading ? <LoadingSpinner /> : 'Analyze'}
        </button>
      </div>
    </form>
  );
}

export default FileUpload;