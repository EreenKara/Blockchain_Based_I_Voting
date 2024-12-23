const express = require('express');
const { createElectionController,getElectionById,getActiveElection } = require('../controllers/electionController');

const router = express.Router();

router.post('/create-election',  createElectionController);
router.get('/:id/active',  getActiveElection);

module.exports = router;