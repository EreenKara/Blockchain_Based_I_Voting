const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const Choice = sequelize.define("Choice", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  parentChoiceId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Bir parentChoice varsa belirtilmeli
    references: { model: "Choices", key: "id" }
  },
  // Seçeneğin türünü belirtmek için 'type' ekliyoruz (blockchain veya database)
  type: {
    type: DataTypes.ENUM("blockchain", "database"),
    allowNull: false,
  },
  // Seçeneğin kategorisini belirtmek için 'category' ekliyoruz
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});





module.exports=Choice;