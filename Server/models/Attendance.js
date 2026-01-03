const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  status: { type: String, enum: ['Present', 'Absent', 'Half-Day', 'Leave'] },
});
module.exports = mongoose.model('Attendance', attendanceSchema);
