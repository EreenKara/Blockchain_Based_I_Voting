const { Sequelize } = require('sequelize');  // Sequelize'i import ediyoruz

// Sequelize ile PostgreSQL bağlantısı kuruyoruz
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,  // .env dosyasından alabiliriz
  username: process.env.PG_USER,  // .env dosyasından alabiliriz
  password: process.env.PG_PASSWORD,  // .env dosyasından alabiliriz
  database: process.env.PG_DB,  // .env dosyasından alabiliriz
});

// Veritabanı bağlantısını test ediyoruz
sequelize.authenticate()
  .then(() => console.log('PostgreSQL bağlantısı başarılı.'))
  .catch((error) => console.error('PostgreSQL bağlantı hatası:', error));

module.exports = sequelize; // Dışarıya aktar
