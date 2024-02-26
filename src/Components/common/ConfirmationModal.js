import React from 'react';

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {

  return (
    <div className={`fixed inset-0 overflow-y-auto ${show ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white rounded-lg w-96">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
            <h2 className="text-lg font-bold">Alert</h2>
            <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-800">{message}</p>
          </div>
          <div className="flex justify-between p-4">
            
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onConfirm}>Yes</button>
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;