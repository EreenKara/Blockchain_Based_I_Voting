const Result = require("../models/Result");
const axios = require("axios");

const calculateElectionResult = async (electionId) => {
  try {
    // Seçimle ilişkili seçenekleri mikroservisten çek
    const response = await axios.get(
      `${process.env.OPTION_SERVICE_URL}/api/options/election/${electionId}`
    );

    const options = response.data.options || [];

    if (options.length === 0) {
      throw new Error("No options found for the given election.");
    }

    // En çok oyu alan seçeneği bul
    const winner = options.reduce((max, option) => {
      return option.voteCount > max.voteCount ? option : max;
    });

    // Sonucu kaydetmek için Sequelize kullanıyoruz
    const result = await Result.create({
      electionId,
      winnerOption: {
        optionId: winner._id,
        optionName: winner.optionName,
        voteCount: winner.voteCount,
      },
    });

    return result;
  } catch (error) {
    throw new Error(`Error calculating result: ${error.message}`);
  }
};

const getResultByElectionId = async (electionId) => {
  try {
    // Sequelize ile sonuç sorgusu yapıyoruz
    const result = await Result.findOne({ where: { electionId } });

    if (!result) {
      throw new Error("Result not found for the given election.");
    }

    // Sonuç objesine kazanan adı ekleniyor
    const kazanan = result.winnerOption?.optionName || "Unknown";

    return { ...result.toJSON(), kazanan };
  } catch (error) {
    throw new Error(`Error retrieving result: ${error.message}`);
  }
};

module.exports = { calculateElectionResult, getResultByElectionId };
