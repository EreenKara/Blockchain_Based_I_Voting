const express = require('express');
const { 
    createOptionController,getOptionsByElectionIdController

} = require('../controllers/optionsController');
const router = express.Router();

router.post('/create-option', createOptionController);
router.get("/election/:electionId", getOptionsByElectionIdController);

module.exports = router;