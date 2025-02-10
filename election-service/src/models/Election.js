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
// Bağlantıyı test et


const Election = sequelize.define('Election', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
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

module.exports = Election;


// electionSchema.virtual('options', {
//   ref: 'Option',
//   localField: '_id', // Election ID ile eşleştirme yapılabilir
//   foreignField: 'electionId', // Option'daki foreign key
//   justOne: false
// });
// electionSchema.methods.fetchOptions = async function() {
//   try {
//     const response = await axios.get(`http://option-service/api/options?electionId=${this._id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching options:', error.message);
//     throw new Error('Unable to fetch options');
//   }
// };
// module.exports = mongoose.model('Election', electionSchema);
