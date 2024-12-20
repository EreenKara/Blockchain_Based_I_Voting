const mongoose = require('mongoose');

const voteTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('VoteType', voteTypeSchema);
