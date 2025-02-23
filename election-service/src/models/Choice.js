const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const Choice=sequelize.define("Choice",{
 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      
});

Choice.associate = (models) => {
    // Many-to-many relationship with Election through ElectionChoice
    Choice.belongsToMany(models.Election, {
      through: 'ElectionChoice',
      foreignKey: 'choiceId',
      otherKey: 'electionId',
    });
};




module.exports=Choice;