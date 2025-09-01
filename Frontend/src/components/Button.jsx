import React from 'react';

const Button = ({ children, onClick, type = 'button', fullWidth = false, size = 'medium', className = '' }) => {
    const sizeClasses = {
        medium: 'py-2.5 px-4 text-sm',
        large: 'py-3 px-6 text-base'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`
            ${fullWidth ? 'w-full' : ''}
            ${sizeClasses[size]}
            flex justify-center border border-transparent rounded-lg shadow-sm font-medium text-white
            bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
            transition-all duration-300 transform hover:scale-105
            ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;