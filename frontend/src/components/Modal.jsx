import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="relative mx-auto p-4 sm:p-8 border w-11/12 md:w-4/5 lg:w-3/4 shadow-2xl rounded-2xl bg-white">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 id="modal-title" className="text-lg font-bold text-blue-700">Resume Details</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1 transition-colors duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;