const express = require('express');
const { createElectionController,addChoiceToElectionController,getElectionByIdOnly,getActiveElection,updateElectionStatusController } = require('../controllers/electionController');

const router = express.Router();

router.post('/create-election',  createElectionController);
router.get('/:id/active',  getActiveElection);
router.get('/:id',getElectionByIdOnly);
//router.get('/options/:id',getElectionByIdController);
router.patch('/change/status/:id',updateElectionStatusController);
router.post("/addChoiceToElection",addChoiceToElectionController);

module.exports = router;