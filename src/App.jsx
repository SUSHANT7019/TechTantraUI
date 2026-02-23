import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Added useLocation
import Home from './pages/Home';
import Registration from './pages/Registration';
import Payment from './pages/Payment';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';

import Navbar from './components/landing/Navbar';

import PaymentSuccess from './pages/PaymentSuccess';
import WinnersPage from './pages/WinnersPage';
import { Toaster } from 'react-hot-toast';

const ConditionalNavbar = () => {
  const location = useLocation();
  // Hide navbar on payment pages and admin routes
  if (location.pathname.startsWith('/payment') || location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Navbar />;
};

function App() {
  useEffect(() => {
    // Force scroll to top on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Toaster position="top-center" toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            border: '1px solid #ffffff20',
          },
        }} />
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/payment/:registrationId" element={<Payment />} />
          {/* Fallback for direct access without ID or testing */}
          <Route path="/payment" element={<Navigate to="/" replace />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <ErrorBoundary>
                  <AdminDashboard />
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
          {/* Redirect /admin to /admin/login */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
