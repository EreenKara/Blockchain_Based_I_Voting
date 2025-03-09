const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Veritabanı adı
  process.env.DB_USER, // Kullanıcı adı
  process.env.DB_PASSWORD, // Şifre
  {
    host: process.env.DB_HOST, // PostgreSQL sunucusu
    dialect: "postgres", // PostgreSQL kullanılacak
    port: process.env.DB_PORT, // Port (varsayılan 5432)
  }
); // Sequelize instance'ınız

const Result = sequelize.define(
  "Result",
  {
    electionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    winnerOption: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // createdAt otomatik olarak oluşturulacak
    tableName: "results",
  }
);
sequelize
  .sync()
  .then(() => console.log("Result tablosu oluşturuldu!"))
  .catch((err) => console.error("Tablo oluşturulurken bir hata oluştu:", err));
// Veritabanı ile bağlantıyı test etme
sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL bağlantısı başarılı.");
  })
  .catch((error) => {
    console.error("PostgreSQL bağlantısı hatası:", error);
  });

module.exports = Result;
