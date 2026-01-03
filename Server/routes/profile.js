const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/role');

const router = express.Router();

// Get profile by id (self or admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching profile', error: err.message });
  }
});

// Admin update profile
router.put('/update/:id', auth, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: 'Updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating profile', error: err.message });
  }
});

module.exports = router;
