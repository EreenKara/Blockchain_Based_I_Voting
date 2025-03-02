const express = require('express');
const { createGroup,addUserToGroup,getUsersInGroup} = require('../controllers/groupController');
const router = express.Router();

router.post("/createGroup",createGroup);
router.post("/addUserToGroup",addUserToGroup);
router.get("/getUserInGroup/:groupId",getUsersInGroup);

module.exports=router;