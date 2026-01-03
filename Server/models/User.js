const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Employee', 'Admin'], default: 'Employee' },
  name: String,
  address: String,
  phone: String,
  jobTitle: String,
  salary: Number,
  profilePic: String,
});
module.exports = mongoose.model('User', userSchema);
