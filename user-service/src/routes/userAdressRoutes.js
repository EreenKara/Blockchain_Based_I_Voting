const express=require("express");
const router=express.Router();
const {createUserAdressController}=require("../controllers/userAdressController");

router.post("/create",createUserAdressController);

module.exports=router;