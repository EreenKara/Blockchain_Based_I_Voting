const express = require('express');
const sequelize=require("./config/database");
const userAdressRoute=require("./routes/userAdressRoutes");
const userRoutes = require('./routes/userRoutes');  // Kullanıcı yönlendirmelerini import ediyoruz
require('dotenv').config();  // .env dosyasını yüklemek için

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/userAdresses',userAdressRoute);

// PostgreSQL bağlantısını sağlıyoruz


sequelize.sync().then(() => {
    console.log("Database connected!");
    app.listen(5004, () => console.log("User Service running on port 5001"));
  });