const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  electionId: { type: String, required: true, unique: true },
  winnerOption: {
    optionId: { type: String, required: true },
    optionName: { type: String, required: true },
    voteCount: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", ResultSchema);
