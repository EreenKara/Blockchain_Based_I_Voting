const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    optionId: { type: String, unique: true },
    optionName: { type: String, required: true },
    optionImgUrl: { type: String },
    optionDescription: { type: String },
    createdBy: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Option', optionSchema);