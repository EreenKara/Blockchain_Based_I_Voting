const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const {User} = require("./User");
const Group = require("./Group");

const UserGroup = sequelize.define("UserGroup", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

// User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId" });
// Group.belongsToMany(User, { through: UserGroup, foreignKey: "groupId" });

module.exports = UserGroup;
