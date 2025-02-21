const express=require("express");
const router=express.Router();
const {createElectionAdressController}=require("../controllers/electionAdressController");

router.post("/create",createElectionAdressController);

module.exports=router;