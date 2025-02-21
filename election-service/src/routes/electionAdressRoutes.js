const express=require("express");
const router=express.Router();
const {createElectionAdressController}=require("../controllers/userAdressController");

router.post("/create",createElectionAdressController);

module.exports=router;