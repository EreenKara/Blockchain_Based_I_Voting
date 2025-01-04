const express = require('express');
const { createElectionController,getElectionByIdOnly,getElectionByIdController,getActiveElection,updateElectionStatusController } = require('../controllers/electionController');

const router = express.Router();

router.post('/create-election',  createElectionController);
router.get('/:id/active',  getActiveElection);
router.get('/:id',getElectionByIdOnly);
router.get('/options/:id',getElectionByIdController);
router.patch('/change/status/:id',updateElectionStatusController);

module.exports = router;