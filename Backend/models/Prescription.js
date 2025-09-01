const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  key: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);