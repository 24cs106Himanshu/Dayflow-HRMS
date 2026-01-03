const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Admin: list all employees
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const users = await User.find({}, 'employeeId name email role jobTitle salary');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching employees', error: err.message });
  }
});

// Get profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching profile', error: err.message });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    await User.findByIdAndUpdate(req.user.id, updates);
    res.json({ msg: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating profile', error: err.message });
  }
});

module.exports = router;
