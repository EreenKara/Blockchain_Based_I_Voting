const {
  createOption,
  getOptionsByElectionId,
  incrementVoteCount,
} = require("../services/optionService");

const createOptionController = async (req, res) => {
  try {
    await createOption(req, res);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the opiton." });
  }
};
const getOptionsByElectionIdController = async (req, res) => {
  const { electionId } = req.params;

  try {
    const options = await getOptionsByElectionId(electionId);
    res.status(200).json({ options });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching options", error: error.message });
  }
};

const updateVoteCount = async (req, res) => {
  try {
    await incrementVoteCount(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ErrorGetching options", error: error.message });
  }
};
module.exports = {
  createOptionController,
  getOptionsByElectionIdController,
  updateVoteCount,
};
