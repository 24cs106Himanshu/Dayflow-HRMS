import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payroll = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee: '',
    baseSalary: '',
    bonus: '',
    deductions: '',
    netSalary: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchPayroll();
  }, [user, navigate]);

  const fetchPayroll = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = user?.role === 'admin' ? 'http://localhost:5001/api/payroll/all' : 'http://localhost:5001/api/payroll/my';
      const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setPayrolls(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching payroll:', err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/payroll/create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        employee: '',
        baseSalary: '',
        bonus: '',
        deductions: '',
        netSalary: '',
      });
      setShowForm(false);
      fetchPayroll();
      alert('Payroll added successfully');
    } catch (err) {
      console.error('Error adding payroll:', err);
      alert('Failed to add payroll');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Payroll Management</h1>
      {user?.role === 'admin' && (
        <button onClick={() => setShowForm(!showForm)} style={styles.button}>
          {showForm ? 'Cancel' : 'Add Payroll'}
        </button>
      )}

      {showForm && user?.role === 'admin' && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Employee (id):</label>
            <input
              type="text"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Base Salary:</label>
            <input
              type="number"
              name="baseSalary"
              value={formData.baseSalary}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Bonus:</label>
            <input
              type="number"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Deductions:</label>
            <input
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Net Salary:</label>
            <input
              type="number"
              name="netSalary"
              value={formData.netSalary}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitBtn}>Submit</button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Base</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll) => (
            <tr key={payroll._id}>
              <td>{payroll.baseSalary ?? '—'}</td>
              <td>{payroll.bonus ?? '—'}</td>
              <td>{payroll.deductions ?? '—'}</td>
              <td>{payroll.netSalary ?? '—'}</td>
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

export default Payroll;
