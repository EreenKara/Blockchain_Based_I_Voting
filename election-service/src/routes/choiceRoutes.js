const express = require('express');
const {createChoiceController,getAllChoicesController,addChoicesToElectionController,getChoicesByElectionController}=require("../controllers/choiceController");

const router=express.Router();

router.post("/createChoice",createChoiceController);
router.get("/getAllChoices",getAllChoicesController);
router.post("/addChoicesToElection",addChoicesToElectionController);
router.get("/getChoiceByElectionId/:id",getChoicesByElectionController);

module.exports=router;