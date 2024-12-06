const express = require('express');
const { castVote, getVotesByVoteType } = require('../controllers/voteController');
const router = express.Router();

router.post('/cast-vote', castVote);
router.get('/:voteTypeId', getVotesByVoteType);

module.exports = router;
