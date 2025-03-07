const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Election = require("./Election");
const Choice = require("./Choice");

// Ara tablo: ElectionChoice
const ElectionChoice = sequelize.define("ElectionChoice", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
  electionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Election,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  choiceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Choice,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
}, {
  timestamps: true, // Seçeneğin hangi tarihte seçime eklendiğini görmek için
  tableName: "ElectionChoices" // Tablo adını belirtiyoruz
});


module.exports = ElectionChoice;
