const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const ElectionAdress=sequelize.define("ElectionAdress",{
  electionId: { 
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
});
module.exports = ElectionAdress;
    
  
