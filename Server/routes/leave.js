const express = require('express');
const Leave = require('../models/Leave');
const auth = require('../middleware/auth');
const router = express.Router();

// Get leaves
router.get('/', auth, async (req, res) => {
  try {
    const leaves = req.user.role === 'Admin' ? await Leave.find() : await Leave.find({ employeeId: req.user.id });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching leaves', error: err.message });
  }
});

// Apply for leave
router.post('/', auth, async (req, res) => {
  try {
    const leave = new Leave({ ...req.body, employeeId: req.user.id });
    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ msg: 'Error applying for leave', error: err.message });
  }
});

// Approve/Reject (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') return res.status(403).json({ msg: 'Access denied' });
    await Leave.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: 'Updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating leave', error: err.message });
  }
});

module.exports = router;
