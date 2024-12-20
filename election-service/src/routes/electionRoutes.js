const express = require('express');
const { createElectionController } = require('../controllers/electionController');

const router = express.Router();

router.post('/create-election',  createElectionController);

module.exports = router;