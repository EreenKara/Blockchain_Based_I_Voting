module.exports = (sequelize, DataTypes) => {
    const District = sequelize.define("District", {
      name: { type: DataTypes.STRING, allowNull: false },
      cityId: { type: DataTypes.INTEGER, allowNull: false },
    });
  
    District.associate = (models) => {
      District.hasMany(models.Neighbourhood, { foreignKey: "districtId" });
      District.belongsTo(models.City, { foreignKey: "cityId" });
    };
  
    return District;
  };
  