const { Model, DataTypes } = require("sequelize");
const axios = require("axios");
const sequelize = require("../config/database");

class Vote extends Model {}

Vote.init(
  {
    electionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    optionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    votedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Vote",
    tableName: "votes", // PostgreSQL'deki tablo adı
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak ekler
  }
);

// Election ve Option bilgilerini çekmek için axios kullanarak mikroservislere istek göndereceğiz
Vote.prototype.fetchElection = async function () {
  try {
    const response = await axios.get(
      `http://election-service/api/elections/${electionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching election:", error.message);
    throw new Error("Unable to fetch election");
  }
};

Vote.prototype.fetchOption = async function () {
  try {
    const response = await axios.get(
      `http://option-service/api/options/election/${electionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching option:", error.message);
    throw new Error("Unable to fetch option");
  }
};

module.exports = Vote;
