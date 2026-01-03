const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const User = require('../models/User');

// Employee dashboard data
exports.employeeDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await User.findById(userId).select('-password');
    const attendance = await Attendance.find({ employee: userId }).sort({ date: -1 }).limit(30);
    const leaves = await Leave.find({ employee: userId }).sort({ from: -1 }).limit(10);

    res.json({
      profile,
      attendanceSummary: attendance.slice(0, 7),
      recentLeaves: leaves.slice(0, 5),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error loading dashboard', error: err.message });
  }
};

// Admin dashboard data
exports.adminDashboard = async (req, res) => {
  try {
    const employeeCount = await User.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });
    const attendanceStats = await Attendance.find().sort({ date: -1 }).limit(50);

    res.json({
      employeeCount,
      pendingLeaves,
      recentAttendance: attendanceStats,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error loading admin dashboard', error: err.message });
  }
};
