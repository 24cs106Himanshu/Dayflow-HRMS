const express = require('express');
const Leave = require('../models/Leave');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/role');

const router = express.Router();

// Employee apply for leave
router.post('/apply', auth, async (req, res) => {
  try {
    const leave = new Leave({ ...req.body, employee: req.user.id, status: 'Pending' });
    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ msg: 'Error applying for leave', error: err.message });
  }
});

// Get own leaves
router.get('/my', auth, async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user.id }).sort({ from: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching leaves', error: err.message });
  }
});

// Admin: get all leaves
router.get('/all', auth, isAdmin, async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ from: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching leaves', error: err.message });
  }
});

// Admin approve leave
router.put('/approve/:id', auth, isAdmin, async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.json({ msg: 'Approved' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating leave', error: err.message });
  }
});

// Admin reject leave
router.put('/reject/:id', auth, isAdmin, async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.json({ msg: 'Rejected' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating leave', error: err.message });
  }
});

module.exports = router;
