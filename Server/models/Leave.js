const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String },
  from: { type: Date },
  to: { type: Date },
  reason: { type: String },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Leave', leaveSchema);
