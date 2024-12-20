const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    
    optionName: { type: String, required: true },
    optionImgUrl: { type: String },
    optionDescription: { type: String },
    optionCount: { type: Number, default: 0 },
    createdBy: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Option', optionSchema);