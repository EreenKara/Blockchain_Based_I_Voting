const {User} = require("./User");
const Group = require("./Group");
const UserGroup = require("./UserGroup");

// ✅ İlişkileri burada tanımla
User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId" });
Group.belongsToMany(User, { through: UserGroup, foreignKey: "groupId" });

module.exports = { User, Group, UserGroup };
