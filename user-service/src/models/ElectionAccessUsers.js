const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");
const {User}=require("./User");

const ElectionAccessUsers=sequelize.define("ElectionAccessUsers",{
    userId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:"Users",
            key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
    },
    electionId:{
        type:DataTypes.INTEGER,
        references:{
            model:"Elections",
            key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
    },


});
User.hasMany(ElectionAccessUsers, { foreignKey: "userId", onDelete: "CASCADE" });
ElectionAccessUsers.belongsTo(User, { foreignKey: "userId" });



module.exports=ElectionAccessUsers;