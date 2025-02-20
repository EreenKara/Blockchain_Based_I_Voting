const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");  // Veritabanı bağlantısını içe aktar

const City = sequelize.define("City", {
  name: { type: DataTypes.STRING, allowNull: false },
  countryId: { type: DataTypes.INTEGER, allowNull: false },
  parentId: { type: DataTypes.INTEGER, allowNull: true },
});

City.associate = (models) => {
  City.hasMany(models.District, { foreignKey: "cityId" });
};

module.exports = City;
