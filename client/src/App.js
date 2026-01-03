import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import Requirements from './pages/Requirements';
import Admin from './pages/Admin';
import './App.css';

const ProtectedRoute = ({ element }) => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/login" />;
};

const AdminRoute = ({ element }) => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" />;
  return element;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/dashboard/employee" element={<ProtectedRoute element={<EmployeeDashboard />} />} />
          <Route path="/dashboard/admin" element={<AdminRoute element={<Admin />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/attendance" element={<ProtectedRoute element={<Attendance />} />} />
          <Route path="/leave" element={<ProtectedRoute element={<Leave />} />} />
          <Route path="/payroll" element={<ProtectedRoute element={<Payroll />} />} />
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          <Route path="/requirements" element={<ProtectedRoute element={<Requirements />} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
