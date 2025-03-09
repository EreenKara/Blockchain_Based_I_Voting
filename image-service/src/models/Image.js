const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Sequelize bağlantınızı buradan import edin

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "images",
  }
);

module.exports = Image;
