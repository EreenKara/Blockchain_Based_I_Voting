const express = require('express');
const userRoutes = require('./routes/userRoutes');  // Kullanıcı yönlendirmelerini import ediyoruz
require('dotenv').config();  // .env dosyasını yüklemek için

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

// PostgreSQL bağlantısını sağlıyoruz


// Veritabanı bağlantısını test ediyoruz

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
