const express = require('express');
const Payroll = require('../models/Payroll');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/role');

const router = express.Router();

// Admin: create payroll entry
router.post('/create', auth, isAdmin, async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    await payroll.save();
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating payroll', error: err.message });
  }
});

// Get own payroll
router.get('/my', auth, async (req, res) => {
  try {
    const payrolls = await Payroll.find({ employee: req.user.id });
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching payroll', error: err.message });
  }
});

// Admin: get all payroll
router.get('/all', auth, isAdmin, async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching payroll', error: err.message });
  }
});

// Admin: update payroll entry
router.put('/update/:id', auth, isAdmin, async (req, res) => {
  try {
    await Payroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: 'Updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating payroll', error: err.message });
  }
});

module.exports = router;
