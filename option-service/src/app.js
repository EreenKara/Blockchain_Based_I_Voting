const express = require('express');
const optionsRoutes = require('./routes/optionsRoutes');
const sequelize=require("./config/database");
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/options', optionsRoutes);


sequelize.sync().then(() => {
    console.log("Database connected!");
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => console.log("Election Service running on port 5002"));
  });