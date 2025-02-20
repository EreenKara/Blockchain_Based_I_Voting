const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const UserAdress=sequelize.define("UserAdress",{
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: "Users", // Users tablosuna referans ver
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  cityId: { type: DataTypes.INTEGER, allowNull: false,
    references:{
      model:"Cities",
      key:"id"
    },
    onUpdate: "CASCADE",
      onDelete: "CASCADE",
   },
  districtId: { type: DataTypes.INTEGER, allowNull: false,
    references:{
    model:"Districts",
    key:"id"
  },
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
},
  neighbourhoodId: { type: DataTypes.INTEGER, allowNull: false,
    references:{
      model:"Neighbourhoods",
      key:"id"
    },
    onUpdate: "CASCADE",
      onDelete: "CASCADE",
   },
  buildingNumber: { type: DataTypes.INTEGER, allowNull: false },
});
module.exports = UserAdress;
    
  
  //   UserAddress.associate = (models) => {
  //     UserAddress.belongsTo(models.City, { foreignKey: "cityId" });
  //     UserAddress.belongsTo(models.District, { foreignKey: "districtId" });
  //     UserAddress.belongsTo(models.Neighbourhood, { foreignKey: "neighbourhoodId" });
  //   };
  //   return UserAddress;
  // };
  