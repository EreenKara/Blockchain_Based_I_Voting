module.exports = (sequelize, DataTypes) => {
    const Neighbourhood = sequelize.define("Neighbourhood", {
      name: { type: DataTypes.STRING, allowNull: false },
      districtId: { type: DataTypes.INTEGER, allowNull: false },
    });
  
    Neighbourhood.associate = (models) => {
      Neighbourhood.belongsTo(models.District, { foreignKey: "districtId" });
    };
  
    return Neighbourhood;
  };
  