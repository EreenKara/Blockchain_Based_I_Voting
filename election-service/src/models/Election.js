const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Election', electionSchema);
