const mongoose = require('mongoose');
const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  month: String,
  salary: Number,
  deductions: Number,
  netPay: Number,
});
module.exports = mongoose.model('Payroll', payrollSchema);
