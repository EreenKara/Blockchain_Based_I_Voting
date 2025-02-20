const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Veritabanı bağlantısını içe aktar
const District = require("./District"); // City modelini içe aktar

const Neigbourhood = sequelize.define(
  "Neighbourhood",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Districts", // Election tablosuna referans
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


module.exports = Neigbourhood;
