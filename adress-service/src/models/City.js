module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define("City", {
      name: { type: DataTypes.STRING, allowNull: false },
      countryId: { type: DataTypes.INTEGER, allowNull: false },
      parentId: { type: DataTypes.INTEGER, allowNull: true },
    });
  
    City.associate = (models) => {
      City.hasMany(models.District, { foreignKey: "cityId" });
    };
  
    return City;
  };
  