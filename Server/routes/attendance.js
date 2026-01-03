const express = require('express');
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');
const router = express.Router();

// Get attendance
router.get('/', auth, async (req, res) => {
  try {
    const records = req.user.role === 'Admin' ? await Attendance.find() : await Attendance.find({ employeeId: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching attendance', error: err.message });
  }
});

// Add attendance
router.post('/', auth, async (req, res) => {
  try {
    const record = new Attendance({ ...req.body, employeeId: req.user.id });
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding attendance', error: err.message });
  }
});

module.exports = router;
