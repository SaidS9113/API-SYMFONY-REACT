import React from 'react';

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-xl w-[80%] md:w-[30%]">
        {children}
      </div>
    </div>
  );
}

export default Modal;