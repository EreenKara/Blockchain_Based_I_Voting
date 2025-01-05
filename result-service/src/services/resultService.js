const Result = require("../models/Result");
const axios = require("axios");

const calculateElectionResult = async (electionId, token) => {
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  try {
    // Seçimle ilişkili seçenekleri mikroservisten çek
    const response = await axios.get(
      `${process.env.OPTION_SERVICE_URL}/api/options/election/${electionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const options = response.data.options || [];
    if (options.length === 0) {
      throw new Error("No options found for the given election.");
    }

    // En çok oyu alan seçeneği bul
    const winner = options.reduce((max, option) => {
      return option.voteCount > max.voteCount ? option : max;
    });

    // Sonucu kaydet
    const result = new Result({
      electionId,
      winnerOption: {
        optionId: winner._id,
        optionName: winner.optionName,
        voteCount: winner.voteCount,
      },
    });
  
    await result.save();

    await axios.patch(
      `${process.env.ELECTION_SERVICE_URL}/api/elections/change/status/${electionId}`,
      { isActive: false },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result;
  } catch (error) {
    throw new Error(`Error calculating result: ${error.message}`);
  }
};

const getResultByElectionId = async (electionId) => {
  const result = await Result.findOne({ electionId });
  
  if (!result) {
    throw new Error("Result not found for the given election.");
  }
  const kazanan = result.winnerOption?.optionName || "Unknown";

  // Sonuç objesine kazanan adı ekleniyor
  return { ...result.toObject(), kazanan };


};

module.exports = { calculateElectionResult, getResultByElectionId };
