import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from './Button.jsx';

const Navbar = ({ isLoggedIn, onLogout, userName }) => {
    
    const navLinkClasses = ({ isActive }) => {
        const base = "font-medium transition-colors";
        const active = "font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600";
        const inactive = "text-gray-600 hover:text-teal-600";
        
        return isActive ? `${base} ${active}` : `${base} ${inactive}`;
    };

    return (
        <nav className="bg-white/60 backdrop-blur-xl shadow-lg fixed w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between items-center h-16">
                    
                    <Link to="/" className="flex items-center space-x-3 cursor-pointer">
                        <svg className="h-8 w-8" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor: '#14B8A6'}} />
                                    <stop offset="100%" style={{stopColor: '#06B6D4'}} />
                                </linearGradient>
                            </defs>
                            <path fill="url(#grad1)" d="M12 2L3.5 5v6c0 5.55 3.84 10.74 8.5 12 4.66-1.26 8.5-6.45 8.5-12V5L12 2zm-1 15v-4H7v-2h4V7h2v4h4v2h-4v4h-2z"/>
                        </svg>
                        <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600">MediQ</span>
                    </Link>

                    {isLoggedIn && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600">
                                Welcome, {userName}!
                            </span>
                        </div>
                    )}
                    
                    {isLoggedIn && (
                        <div className="flex items-center space-x-6">
                            <NavLink to="/" className={navLinkClasses} end>Dashboard</NavLink>
                            <NavLink to="/orders" className={navLinkClasses}>Order History</NavLink>
                            <NavLink to="/reports" className={navLinkClasses}>My Reports</NavLink>
                            <Button onClick={onLogout}>Logout</Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

