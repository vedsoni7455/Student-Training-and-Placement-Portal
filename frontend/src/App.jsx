import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import CollegeDashboard from './components/CollegeDashboard';
import AdminDashboard from './components/AdminDashboard';

// Role-based route protection
const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // For demo purposes, we'll use localStorage to store user role
  // In production, this should come from backend/user profile
  const getUserRole = () => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) return storedRole;
    
    // Fallback to email-based detection
    if (user.email.includes('student')) return 'student';
    if (user.email.includes('company')) return 'company';
    if (user.email.includes('college')) return 'college';
    if (user.email.includes('admin')) return 'admin';
    return 'student'; // default
  };
  
  const userRole = getUserRole();
  
  if (userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    return <Navigate to={`/${userRole}`} replace />;
  }
  
  return children;
};

function AppContent() {
  const { user } = useAuth();

  const getUserRole = () => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) return storedRole;
    
    if (user?.email.includes('student')) return 'student';
    if (user?.email.includes('company')) return 'company';
    if (user?.email.includes('college')) return 'college';
    if (user?.email.includes('admin')) return 'admin';
    return 'student';
  };

  const getDefaultRoute = () => {
    if (!user) return '/login';
    const role = getUserRole();
    return `/${role}`;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to={getDefaultRoute()} replace /> : <Login />} 
        />
        <Route path="/student" element={
          <PrivateRoute requiredRole="student">
            <StudentDashboard />
          </PrivateRoute>
        } />
        <Route path="/company" element={
          <PrivateRoute requiredRole="company">
            <CompanyDashboard />
          </PrivateRoute>
        } />
        <Route path="/college" element={
          <PrivateRoute requiredRole="college">
            <CollegeDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
