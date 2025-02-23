const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../config/database");
 

const ElectionChoice=sequelize.define("Choice",{
 
    electionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Elections',
          key: 'id',
        },
      },
      choiceId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Choices',
          key: 'id',
        },
      },
  });

  

module.exports=ElectionChoice;