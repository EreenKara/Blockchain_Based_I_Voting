const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Option = sequelize.define(
  "Option",
  {
    optionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    optionDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    voteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    electionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Elections",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    // Seçenek türü
    optionType: {
      type: DataTypes.ENUM("registered_user", "guest_user", "inanimate_entity"),
      allowNull: false,
    },
    // Kayıtlı kullanıcı için userId, user mikroservisindeki User tablosuna bağlanacak
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users", // user mikroservisindeki tablo
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    // Kayıt olmamış kullanıcı için ad ve e-posta
    guestName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guestEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    // Cansız varlık ismi
    entityName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(7), // Hex renk kodu için #FFFFFF formatında
      allowNull: false,
      validate: {
        isHexColor(value) {
          if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {
            throw new Error("Color must be a valid hexadecimal code (e.g., #FFAABB).");
          }
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Option;
