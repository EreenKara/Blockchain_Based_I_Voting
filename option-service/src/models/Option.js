const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Veritabanı adı
  process.env.DB_USER,      // Kullanıcı adı
  process.env.DB_PASSWORD,  // Şifre
  {
    host: process.env.DB_HOST,  // PostgreSQL sunucusu
    dialect: 'postgres',        // PostgreSQL kullanılacak
    port: process.env.DB_PORT,  // Port (varsayılan 5432)
  }
);

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
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    electionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Elections", // Election tablosuna referans
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);
sequelize.sync()
  .then(() => console.log("Users tablosu oluşturuldu!"))
  .catch(err => console.error('Tablo oluşturulurken bir hata oluştu:', err));
// Veritabanı ile bağlantıyı test etme
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL bağlantısı başarılı.');
  })
  .catch((error) => {
    console.error('PostgreSQL bağlantısı hatası:', error);
  });

module.exports = Option;
