const express = require("express");
const {
  calculateResultController,
  getResultController,
} = require("../controllers/resultController");

const router = express.Router();

// Seçimin sonucunu hesapla
router.post("/calculate/:electionId", calculateResultController);

// Seçim sonucunu getir
router.get("/:electionId", getResultController);

module.exports = router;
