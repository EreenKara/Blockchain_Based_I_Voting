const express = require("express");
const {
  createElectionController,
  setElectionAccessController,
  getElectionByIdOnly,
  getActiveElectionController,
  updateElectionStatusController,
  addChoiceToElectionController,
  getElectionByIdController,
  updateElectionAccessController,
  setAccessTypeController, // ✅ yeni
  addOptionToElectionController, // ✅ yeni
  getAllElectionsController,
} = require("../controllers/electionController");

const router = express.Router();

// STEP 1
router.post("/create-election", createElectionController);

// STEP 2
router.patch("/setAccessType", setAccessTypeController);
router.post("/setElectionAccess", setElectionAccessController);
router.put("/updateElectionAccess", updateElectionAccessController);

// STEP 3
router.post("/addOptionToElection", addOptionToElectionController);

// STEP 4
router.post("/addChoiceToElection", addChoiceToElectionController);

// Diğer
router.get("/:id", getElectionByIdOnly);
router.get("/getElections/all", getAllElectionsController);
router.get("/:id/active", getActiveElectionController);
router.get("/electionWithOptions/:id", getElectionByIdController);
router.patch("/change/status/:id", updateElectionStatusController);
// router.patch("/changeElectionStatus/:id", updateElectionStatusIfActiveController);

module.exports = router;
