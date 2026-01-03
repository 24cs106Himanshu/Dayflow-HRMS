const express = require('express');
const { employeeDashboard, adminDashboard } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/role');

const router = express.Router();

router.get('/employee', auth, employeeDashboard);
router.get('/admin', auth, isAdmin, adminDashboard);

module.exports = router;
