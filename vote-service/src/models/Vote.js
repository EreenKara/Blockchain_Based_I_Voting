const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    voteTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'VoteType', required: true },
    voteOption: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vote', voteSchema);
