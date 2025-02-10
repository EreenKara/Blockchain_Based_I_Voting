const { Model, DataTypes,Sequelize} = require('sequelize');
const axios = require('axios');

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
);// Sequelize instance'ınızı import edin

class Vote extends Model {}

Vote.init(
  {
    electionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    votedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Vote',
    tableName: 'votes', // PostgreSQL'deki tablo adı
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik olarak ekler
  }
);

// Election ve Option bilgilerini çekmek için axios kullanarak mikroservislere istek göndereceğiz
Vote.prototype.fetchElection = async function() {
  try {
    const response = await axios.get(`http://election-service/api/elections/${electionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching election:', error.message);
    throw new Error('Unable to fetch election');
  }
};

Vote.prototype.fetchOption = async function() {
  try {
    const response = await axios.get(`http://option-service/api/options/election/${electionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching option:', error.message);
    throw new Error('Unable to fetch option');
  }
};
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

module.exports = Vote;
