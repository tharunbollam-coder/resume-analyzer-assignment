import React from 'react';

const LoadingSpinner = () => (
  <div
    className="w-8 h-8 border-4 border-t-4 border-blue-400 border-opacity-30 rounded-full animate-spin border-t-blue-600"
    role="status"
    aria-label="Loading"
  ></div>
);

export default LoadingSpinner;