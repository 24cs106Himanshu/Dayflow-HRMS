import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/dashboard/employee', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        setError('Unable to load dashboard');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div style={styles.page}>{error || 'Loading...'}</div>;

  return (
    <div style={styles.page}>
      <h1>Employee Dashboard</h1>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.card}>
        <h3>Profile</h3>
        <p>Name: {data.profile?.name}</p>
        <p>Email: {data.profile?.email}</p>
        <p>Job Title: {data.profile?.jobTitle || 'N/A'}</p>
      </div>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Recent Attendance</h3>
          <ul>
            {data.attendanceSummary?.map(item => (
              <li key={item._id}>{new Date(item.date).toLocaleDateString()} - {item.status}</li>
            ))}
          </ul>
        </div>
        <div style={styles.card}>
          <h3>Recent Leaves</h3>
          <ul>
            {data.recentLeaves?.map(item => (
              <li key={item._id}>{item.type || 'Leave'}: {item.status}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: '30px', background: '#f5f5f5', minHeight: '100vh' },
  card: { background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginTop: '10px' },
  error: { padding: '10px', background: '#ffe2e2', color: '#a11', borderRadius: '6px' },
};

export default EmployeeDashboard;
