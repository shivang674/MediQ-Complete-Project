import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-600 to-cyan-600 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-3">
          
          <svg className="h-8 w-8 text-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M12 2L3.5 5v6c0 5.55 3.84 10.74 8.5 12 4.66-1.26 8.5-6.45 8.5-12V5L12 2zm-1 15v-4H7v-2h4V7h2v4h4v2h-4v4h-2z"/>
          </svg>
          
          <span className="font-bold text-2xl text-white">MediQ</span>
        </div>
        <p className="mt-4 text-center text-sm text-teal-100">
          Copyright © 2025, MediQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

