const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Group = require("./Group");

const ElectionAccessGroups = sequelize.define("ElectionAccessGroups", {
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Groups",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    electionId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Elections",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
  

});

// ✅ Grup ilişkisini tanımla

Group.hasMany(ElectionAccessGroups, { foreignKey: "groupId",onDelete: "CASCADE"});
ElectionAccessGroups.belongsTo(Group, { foreignKey: "groupId" });


module.exports = ElectionAccessGroups;
