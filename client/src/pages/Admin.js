import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/dashboard/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        setError('Unable to load admin data.');
        if (err?.response?.status === 401) navigate('/login');
        console.error('Admin fetch error:', err);
      }
    };

    fetchData();
  }, [navigate]);

  if (!data) return <div style={styles.page}>{error || 'Loading...'}</div>;

  return (
    <div style={styles.page}>
      <h1>Admin Dashboard</h1>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.grid}>
        <section style={styles.card}>
          <h3>Employees</h3>
          <p>Total employees: {data.employeeCount}</p>
        </section>

        <section style={styles.card}>
          <h3>Pending Leaves</h3>
          <p>{data.pendingLeaves}</p>
        </section>

        <section style={styles.card}>
          <h3>Recent Attendance</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentAttendance?.map(record => (
                  <tr key={record._id}>
                    <td>{record.employee}</td>
                    <td>{record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}</td>
                    <td>{record.status || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '30px',
    background: '#f5f5f5',
    minHeight: '100vh',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tableWrapper: {
    maxHeight: '280px',
    overflow: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  error: {
    padding: '10px',
    background: '#ffe2e2',
    color: '#a11',
    borderRadius: '6px',
  },
};

export default Admin;
