const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { User } = require("./User");
const Group = require("./Group");

// UserGroup modelini oluşturuyoruz (Ara Tablo)
const UserGroup = sequelize.define("UserGroup", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Group,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
}, {
  timestamps: true, // Kullanıcının gruba ne zaman eklendiğini görmek için
  tableName: "UserGroups" // Tablo adını belirtiyoruz
});

// **İlişkileri Tanımlıyoruz**
User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId" });
Group.belongsToMany(User, { through: UserGroup, foreignKey: "groupId" });

module.exports = UserGroup;
