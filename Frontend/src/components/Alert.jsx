import React from 'react';

const Alert = ({ message, type }) => {
  const baseClasses = "text-sm p-4 rounded-lg";
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };
  return (
    <div className={`${baseClasses} ${typeClasses[type] || 'bg-gray-100 text-gray-700'}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;