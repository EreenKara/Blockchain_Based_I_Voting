const express = require("express");
const dotenv = require("dotenv");
const tokenRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auths", tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JWT-Service ${PORT} portunda çalışıyor.`);
});
