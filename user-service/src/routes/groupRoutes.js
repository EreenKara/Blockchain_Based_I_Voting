const express = require("express");
const {
  createGroup,
  addUserToGroup,
  getUsersInGroup,
  getAllGroups,
  inviteUserToGroup,
} = require("../controllers/groupController");
const router = express.Router();

router.post("/createGroup", createGroup);
router.post("/addUserToGroup", addUserToGroup);
router.get("/getGroupWithUsers/:groupId", getUsersInGroup);
router.get("/getAllGroups", getAllGroups);
router.post("/send-invite",inviteUserToGroup);

module.exports = router;
