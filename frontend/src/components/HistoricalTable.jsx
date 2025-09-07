import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import AnalysisCard from './AnalysisCard';
import LoadingSpinner from './LoadingSpinner';

function HistoricalTable() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/history');
        if (!response.ok) {
          throw new Error('Failed to fetch historical data.');
        }
        const data = await response.json();
        setResumes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const fetchResumeDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/history/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resume details.');
      }
      const data = await response.json();
      setSelectedResume(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedResume(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-48"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="mt-8">
      {resumes.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-100 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-blue-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-blue-700 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-blue-700 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-blue-700 uppercase tracking-wider">Original Filename</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-blue-700 uppercase tracking-wider">Uploaded At</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {resumes.map((resume) => (
                <tr key={resume.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">{resume.name || 'N/A'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500">{resume.email || 'N/A'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500">{resume.filename}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500">{new Date(resume.uploaded_at).toLocaleDateString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => fetchResumeDetails(resume.id)}
                      className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No analyzed resumes found yet. Upload one on the "Live Analysis" tab!</p>
      )}

      <Modal show={!!selectedResume} onClose={closeModal}>
        {selectedResume && <AnalysisCard data={selectedResume} />}
      </Modal>
    </div>
  );
}

export default HistoricalTable;