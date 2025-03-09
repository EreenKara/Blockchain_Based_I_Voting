const asyncHandler = require("../middlewares/asyncHandler");
const { createChoice, getAllChoices } = require("../services/choiceService");

const createChoiceController = asyncHandler(async (req, res) => {
  await createChoice(req, res);
});

const getAllChoicesController = asyncHandler(async (req, res) => {
  const choices = await getAllChoices();
  res.status(200).json(choices);
});

module.exports = { createChoiceController, getAllChoicesController };
