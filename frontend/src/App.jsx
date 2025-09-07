import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import AnalysisCard from './components/AnalysisCard';
import HistoricalTable from './components/HistoricalTable';

function App() {
  const [activeTab, setActiveTab] = useState('live');
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysisResult = (data) => {
    setAnalysisData(data);
    setError('');
    setLoading(false);
  };

  const handleAnalysisError = (err) => {
    setError(err);
    setAnalysisData(null);
    setLoading(false);
  };

  const handleLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-extrabold text-blue-700 tracking-tight">Resume Analyzer</h1>
          <nav className="flex space-x-2 md:space-x-4">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-4 py-2 rounded-full text-sm md:text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                activeTab === 'live'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              Live Analysis
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-full text-sm md:text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              Historical Viewer
            </button>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-8">
        <div className="w-full">
          {activeTab === 'live' && (
            <div>
              <FileUpload
                onAnalysisResult={handleAnalysisResult}
                onAnalysisError={handleAnalysisError}
                onLoadingState={handleLoadingState}
              />
              {loading && <div className="mt-8 text-center text-lg text-gray-600 animate-pulse">Analyzing your resume...</div>}
              {error && <div className="mt-8 text-center text-lg text-red-500 animate-shake">{error}</div>}
              {analysisData && <AnalysisCard data={analysisData} />}
            </div>
          )}
          {activeTab === 'history' && <HistoricalTable />}
        </div>
      </main>
    </div>
  );
}

export default App;