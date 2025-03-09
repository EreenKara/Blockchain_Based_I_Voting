const {
  calculateElectionResult,
  getResultByElectionId,
} = require("../services/resultService");

const calculateResultController = async (req, res) => {
  const { electionId } = req.params;

  try {
    const result = await calculateElectionResult(electionId);
    res
      .status(200)
      .json({ message: "Election result calculated successfully", result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getResultController = async (req, res) => {
  const { electionId } = req.params;

  try {
    const result = await getResultByElectionId(electionId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { calculateResultController, getResultController };
