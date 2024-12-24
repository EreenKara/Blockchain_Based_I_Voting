const express = require('express');
const { createElectionController,getElectionByIdOnly,getElectionByIdController,getActiveElection } = require('../controllers/electionController');

const router = express.Router();

router.post('/create-election',  createElectionController);
router.get('/:id/active',  getActiveElection);
router.get('/:id',getElectionByIdOnly);
router.get('/options/:id',getElectionByIdController);

module.exports = router;