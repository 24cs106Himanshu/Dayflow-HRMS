import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/employees/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Dayflow HRMS</h2>
        <nav>
          <a href="/dashboard" style={styles.navLink}>Dashboard</a>
          <a href="/profile" style={styles.navLink}>Profile</a>
          <a href="/attendance" style={styles.navLink}>Attendance</a>
          <a href="/leave" style={styles.navLink}>Leave</a>
          <a href="/payroll" style={styles.navLink}>Payroll</a>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </nav>
      </div>
      <div style={styles.mainContent}>
        <h1>Welcome, {profile?.name}</h1>
        <div style={styles.card}>
          <h3>Profile Information</h3>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Employee ID:</strong> {profile?.employeeId}</p>
          <p><strong>Role:</strong> {profile?.role}</p>
          <p><strong>Job Title:</strong> {profile?.jobTitle || 'N/A'}</p>
          <p><strong>Phone:</strong> {profile?.phone || 'N/A'}</p>
          <p><strong>Salary:</strong> {profile?.salary || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333',
    color: 'white',
    padding: '20px',
  },
  navLink: {
    display: 'block',
    padding: '10px 0',
    color: 'white',
    textDecoration: 'none',
    marginBottom: '10px',
  },
  logoutBtn: {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  mainContent: {
    flex: 1,
    padding: '40px',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginTop: '20px',
  },
};

export default Dashboard;
