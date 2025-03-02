const express=require("express");
const {addAccessUserToElectionController,getUsersWithAccessToElectionController,getGroupsWithAccessToElectionController}=require("../controllers/electionAccessUsersController");
const router=express.Router();

router.post("/addAccessUserToElection",addAccessUserToElectionController);
router.get("/getUsersWithAccessToElection/:electionId",getUsersWithAccessToElectionController);
router.get("/getGroupsWithAccessToElection/:electionId",getGroupsWithAccessToElectionController);

module.exports=router;