const express = require("express");
const {
  addAccessGroupToElectionController,
  getGroupsWithAccessToElectionController,
} = require("../controllers/electionAccessGroupsController");
const router = express.Router();

router.post("/addAccessGroupToElection", addAccessGroupToElectionController);
router.get(
  "/getGroupsWithAccessToElection/:electionId/groups",
  getGroupsWithAccessToElectionController
);

module.exports = router;
