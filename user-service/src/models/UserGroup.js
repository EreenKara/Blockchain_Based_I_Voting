const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const {User} = require("./User");
const Group = require("./Group");

const UserGroup = sequelize.define("UserGroup", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
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

UserGroup.belongsTo(User, { foreignKey: "userId" });
UserGroup.belongsTo(Group, { foreignKey: "groupId" });

User.hasMany(UserGroup, { foreignKey: "userId" });
Group.hasMany(UserGroup, { foreignKey: "groupId" });

module.exports = UserGroup;
