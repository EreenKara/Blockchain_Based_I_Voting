const express = require('express');
const { createVoteType, getVoteTypes } = require('../controllers/votingController');
const router = express.Router();

router.post('/create', createVoteType);
router.get('/', getVoteTypes);

module.exports = router;
