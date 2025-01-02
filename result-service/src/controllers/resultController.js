const { calculateElectionResult, getResultByElectionId } = require("../services/resultService");

const calculateResultController = async (req, res) => {
  const { electionId } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const result = await calculateElectionResult(electionId, token);
    res.status(200).json({ message: "Election result calculated successfully", result });
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
