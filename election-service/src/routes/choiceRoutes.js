const express = require("express");
const {
  createChoiceController,
  getAllChoicesController,
} = require("../controllers/choiceController");

const router = express.Router();

router.post("/createChoice", createChoiceController);
router.get("/getAllChoices", getAllChoicesController);

module.exports = router;
