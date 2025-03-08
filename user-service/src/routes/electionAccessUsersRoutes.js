const express=require("express");
const {addAccessUserToElectionController,getUsersWithAccessToElectionController,}=require("../controllers/electionAccessUsersController");
const router=express.Router();

router.post("/addAccessUserToElection",addAccessUserToElectionController);
router.get("/getUsersWithAccessToElection/:electionId",getUsersWithAccessToElectionController);

module.exports=router;