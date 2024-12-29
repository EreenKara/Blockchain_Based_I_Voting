const express = require("express");
const { getElection, vote, results } = require("../controllers/voteController");
const router = express.Router();

// Seçimi ve seçenekleri getir
router.get("/election/:electionId", getElection);

// Oy verme işlemi
router.post("/vote", vote);

// Sonuçları getir
router.get("/results/:electionId", results);

module.exports = router;
