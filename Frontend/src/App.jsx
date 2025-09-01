import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import PrescriptionUploadPage from './pages/PrescriptionUploadPage.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserSession = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
          setUser(data);
          setIsLoggedIn(true);
        } catch (error) {
          localStorage.removeItem('userToken');
        }
      }
      setIsLoading(false);
    };
    verifyUserSession();
  }, []);
  
  const handleLoginSuccess = async (token) => {
    localStorage.setItem('userToken', token);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
      setUser(data);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      handleLogout();
    }
  };

  const handleLogout = () => {
      localStorage.removeItem('userToken');
      setIsLoggedIn(false);
      setUser(null);
      navigate('/login');
  }

  if (isLoading) {
    return null; // Or a full-page loading spinner
  }
  
  return (
    <div className="bg-gradient-to-br from-sky-100 to-teal-100 min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userName={user?.name} />
      <main className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage onLoginSuccess={handleLoginSuccess} />} />
          
          {/* Protected Routes */}
          <Route path="/" element={isLoggedIn ? <WelcomePage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/upload" element={isLoggedIn ? <PrescriptionUploadPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/orders" element={isLoggedIn ? <OrderHistoryPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/reports" element={isLoggedIn ? <ReportsPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

