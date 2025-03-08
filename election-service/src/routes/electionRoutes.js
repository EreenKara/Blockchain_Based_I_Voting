const express = require('express');
const { createElectionController,
    setElectionAccessController,
    getElectionByIdOnly,
    getActiveElectionController,
    updateElectionStatusController,
    addChoiceToElectionController,
    getElectionByIdController,
    updateElectionAccessController
    
} = require('../controllers/electionController');

const router = express.Router();

router.post('/create-election',  createElectionController);
router.get('/:id/active',  getActiveElectionController);
router.get('/:id',getElectionByIdOnly);
router.patch('/change/status/:id',updateElectionStatusController);
router.post("/setElectionAccess",setElectionAccessController);
router.post("/addChoiceToElection",addChoiceToElectionController);
router.get("/electionWithOptions/:id",getElectionByIdController);
router.put("/updateElectionAccess",updateElectionAccessController);
// router.patch("/changeElectionStatus/:id",updateElectionStatusIfActiveController);

module.exports = router;