const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../config/database");


const Election = sequelize.define("Election", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  createdBy: { type: DataTypes.STRING,
    allowNull: false, }, // Kullanıcı ID'si
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true }, // URL veya Blob olabilir
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  status: { 
      type: DataTypes.ENUM("active", "upcoming", "completed"), 
      allowNull: false 
  },
  accessType: { 
      type: DataTypes.ENUM("public", "private"), 
      allowNull: false 
  },
  electionType: { 
    type: DataTypes.ENUM("blockchain", "database","null"),  // Yeni eklenen alan
    allowNull: false 
  },
  step:{
    type:DataTypes.STRING,allowNull:false
  },
  
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
module.exports = Election;



