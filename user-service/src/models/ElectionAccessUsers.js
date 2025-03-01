const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");
const {User}=require("./User");
const Group = require("./Group");

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
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Bireysel erişimler için null olabilir
        references: {
            model: Group,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },

});
User.hasMany(ElectionAccessUsers, { foreignKey: "userId", onDelete: "CASCADE" });
ElectionAccessUsers.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(ElectionAccessUsers, { foreignKey: "groupId", onDelete: "CASCADE" });
ElectionAccessUsers.belongsTo(Group, { foreignKey: "groupId" });

module.exports=ElectionAccessUsers;