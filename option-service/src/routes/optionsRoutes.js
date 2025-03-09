const express = require("express");
const {
  createOptionController,
  getOptionsByElectionIdController,
  updateVoteCount,
} = require("../controllers/optionsController");
const router = express.Router();

router.post("/create-option", createOptionController);
router.get("/election/:electionId", getOptionsByElectionIdController);
router.put("/:optionId/increment-vote", updateVoteCount);

module.exports = router;
