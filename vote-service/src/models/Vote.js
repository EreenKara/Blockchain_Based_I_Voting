const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    electionId: { type: String, required: true },
    optionId: { type: String, required: true }, 
    votedBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);
