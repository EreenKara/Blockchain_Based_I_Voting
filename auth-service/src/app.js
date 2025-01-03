const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const tokenRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", tokenRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JWT-Service ${PORT} portunda çalışıyor.`);
});
