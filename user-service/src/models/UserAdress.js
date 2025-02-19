module.exports = (sequelize, DataTypes) => {
    const UserAddress = sequelize.define("UserAddress", {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      cityId: { type: DataTypes.INTEGER, allowNull: false },
      districtId: { type: DataTypes.INTEGER, allowNull: false },
      neighbourhoodId: { type: DataTypes.INTEGER, allowNull: false },
      buildingNumber: { type: DataTypes.INTEGER, allowNull: false },
    });
  
    UserAddress.associate = (models) => {
      UserAddress.belongsTo(models.City, { foreignKey: "cityId" });
      UserAddress.belongsTo(models.District, { foreignKey: "districtId" });
      UserAddress.belongsTo(models.Neighbourhood, { foreignKey: "neighbourhoodId" });
    };
    return UserAddress;
  };
  