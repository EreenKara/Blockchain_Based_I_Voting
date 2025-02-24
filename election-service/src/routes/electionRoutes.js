const express = require('express');
const { createElectionController,addElectionTypeController,getElectionByIdOnly,getActiveElection,updateElectionStatusController,addChoiceToElectionController,getElectionByIdController} = require('../controllers/electionController');

const router = express.Router();

router.post('/create-election',  createElectionController);
router.get('/:id/active',  getActiveElection);
router.get('/:id',getElectionByIdOnly);
router.patch('/change/status/:id',updateElectionStatusController);
router.post("/addTypeToElection",addElectionTypeController);
router.post("/addChoiceToElection",addChoiceToElectionController);
router.get("/electionWithOptions/:id",getElectionByIdController);

module.exports = router;