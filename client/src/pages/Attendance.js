import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Attendance = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchAttendance();
  }, [user, navigate]);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = user?.role === 'admin' ? 'http://localhost:5001/api/attendance/all' : 'http://localhost:5001/api/attendance/my';
      const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setRecords(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setLoading(false);
    }
  };

  const handleCheck = async (type) => {
    try {
      const token = localStorage.getItem('token');
      const now = new Date();
      const payload = type === 'checkin' ? { checkIn: now.toISOString() } : { checkOut: now.toISOString() };
      await axios.post(`http://localhost:5001/api/attendance/${type}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAttendance();
      alert(`${type} recorded`);
    } catch (err) {
      console.error('Error recording attendance:', err);
      alert('Failed to record attendance');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Attendance</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleCheck('checkin')} style={styles.button}>Check In</button>
        <button onClick={() => handleCheck('checkout')} style={{ ...styles.button, marginLeft: '10px' }}>Check Out</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}</td>
              <td>{record.status}</td>
              <td>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '—'}</td>
              <td>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    maxWidth: '400px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
};

export default Attendance;
