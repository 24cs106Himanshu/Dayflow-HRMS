const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
  phone: { type: String },
  address: { type: String },
  jobTitle: { type: String },
  department: { type: String },
  salary: { type: Number },
  profilePic: { type: String },
});

module.exports = mongoose.model('User', userSchema);
