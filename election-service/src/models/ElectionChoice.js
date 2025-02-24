const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../config/database");
const Election = require("./Election");
const Choice = require("./Choice");
 

const ElectionChoice = sequelize.define("ElectionChoice", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  electionId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: Election, key: "id" }, 
      onDelete: "CASCADE"
  },
  choiceId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: Choice, key: "id" }, 
      onDelete: "CASCADE"
  }
});

// // Many-to-Many ilişki tanımlaması
// Election.belongsToMany(Choice, { through: ElectionChoice });
// Choice.belongsToMany(Election, { through: ElectionChoice });
  

module.exports=ElectionChoice;