const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Veritabanı bağlantısını içe aktar
const City = require("./City"); // City modelini içe aktar

const District = sequelize.define(
  "District",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cities", // Election tablosuna referans
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = District;
