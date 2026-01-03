const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['Paid', 'Sick', 'Unpaid'] },
  startDate: Date,
  endDate: Date,
  remarks: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});
module.exports = mongoose.model('Leave', leaveSchema);
