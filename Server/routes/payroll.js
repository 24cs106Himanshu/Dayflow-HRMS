const express = require('express');
const Payroll = require('../models/Payroll');
const auth = require('../middleware/auth');
const router = express.Router();

// Get payroll
router.get('/', auth, async (req, res) => {
  try {
    const payrolls = req.user.role === 'Admin' ? await Payroll.find() : await Payroll.find({ employeeId: req.user.id });
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching payroll', error: err.message });
  }
});

// Add/Update payroll (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') return res.status(403).json({ msg: 'Access denied' });
    const payroll = new Payroll(req.body);
    await payroll.save();
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding payroll', error: err.message });
  }
});

module.exports = router;
