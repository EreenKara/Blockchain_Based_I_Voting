const express = require("express");
const {
  createGroup,
  addUserToGroup,
  getUsersInGroup,
  getAllGroups,
} = require("../controllers/groupController");
const router = express.Router();

router.post("/createGroup", createGroup);
router.post("/addUserToGroup", addUserToGroup);
router.get("/getGroupWithUsers/:groupId", getUsersInGroup);
router.get("/getAllGroups", getAllGroups);

module.exports = router;
