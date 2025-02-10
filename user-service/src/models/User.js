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

// User modelini Sequelize ile oluşturuyoruz
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  identityNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [11, 11],  // 11 karakterli olmalı
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    lowercase: true,
    // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[0-9]{10}$/,  // Telefon numarasını 10 haneli kontrol eder
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6],  // Minimum 6 karakter
    },
    // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  },
  hasPaidBalance: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Varsayılan olarak bakiye ödenmemiş
  },
}, {
  timestamps: true, // createdAt, updatedAt alanlarını otomatik oluşturur
});

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

// Modeli dışa aktarıyoruz
module.exports = User;
