const express = require('express');
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/role');

const router = express.Router();

// Employee check-in
router.post('/checkin', auth, async (req, res) => {
  try {
    const record = new Attendance({ employee: req.user.id, status: 'Present', checkIn: req.body.checkIn });
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: 'Error recording check-in', error: err.message });
  }
});

// Employee check-out
router.post('/checkout', auth, async (req, res) => {
  try {
    const record = await Attendance.findOne({ employee: req.user.id }).sort({ date: -1 });
    if (!record) return res.status(404).json({ msg: 'No attendance record found' });
    record.checkOut = req.body.checkOut;
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: 'Error recording check-out', error: err.message });
  }
});

// Get own attendance
router.get('/my', auth, async (req, res) => {
  try {
    const records = await Attendance.find({ employee: req.user.id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching attendance', error: err.message });
  }
});

// Admin: get all attendance
router.get('/all', auth, isAdmin, async (req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching attendance', error: err.message });
  }
});

module.exports = router;
