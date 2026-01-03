import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Leave = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Paid',
    startDate: '',
    endDate: '',
    remarks: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchLeaves();
  }, [user, navigate]);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/leave/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leaves:', err);
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
      await axios.post('http://localhost:5001/api/leave/apply', {
        type: formData.type,
        from: formData.startDate,
        to: formData.endDate,
        reason: formData.remarks,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ type: 'Paid', startDate: '', endDate: '', remarks: '' });
      setShowForm(false);
      fetchLeaves();
      alert('Leave request submitted successfully');
    } catch (err) {
      console.error('Error submitting leave:', err);
      alert('Failed to submit leave request');
    }
  };

  const handleApprove = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = status === 'Approved' ? 'approve' : 'reject';
      await axios.put(`http://localhost:5001/api/leave/${endpoint}/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeaves();
      alert(`Leave ${status.toLowerCase()}`);
    } catch (err) {
      console.error('Error updating leave:', err);
      alert('Failed to update leave');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Leave Management</h1>
      <button onClick={() => setShowForm(!showForm)} style={styles.button}>
        {showForm ? 'Cancel' : 'Apply for Leave'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Leave Type:</label>
            <select name="type" value={formData.type} onChange={handleChange} style={styles.input}>
              <option>Paid</option>
              <option>Sick</option>
              <option>Unpaid</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Remarks:</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.submitBtn}>Submit</button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            {user?.role === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.type}</td>
              <td>{leave.from ? new Date(leave.from).toLocaleDateString() : 'N/A'}</td>
              <td>{leave.to ? new Date(leave.to).toLocaleDateString() : 'N/A'}</td>
              <td>{leave.status}</td>
              {user?.role === 'admin' && (
                <td>
                  {leave.status === 'Pending' && (
                    <>
                      <button onClick={() => handleApprove(leave._id, 'Approved')} style={styles.approveBtn}>
                        Approve
                      </button>
                      <button onClick={() => handleApprove(leave._id, 'Rejected')} style={styles.rejectBtn}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              )}
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
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    minHeight: '100px',
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
  approveBtn: {
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  rejectBtn: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Leave;
