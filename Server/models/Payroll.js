const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  baseSalary: { type: Number },
  bonus: { type: Number },
  deductions: { type: Number },
  netSalary: { type: Number },
});

module.exports = mongoose.model('Payroll', payrollSchema);
