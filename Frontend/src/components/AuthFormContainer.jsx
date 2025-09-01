import React from 'react';

const AuthFormContainer = ({ title, children }) => (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-800">{title}</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white/60 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10">
                {children}
            </div>
        </div>
    </div>
);

export default AuthFormContainer;