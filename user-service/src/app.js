const express = require("express");
require("./models/associations");
const rateLimit = require("express-rate-limit");

const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const groupRoutes = require("./routes/groupRoutes");
const userAdressRoute = require("./routes/userAdressRoutes");
const userRoutes = require("./routes/userRoutes");
const electionAccessUsersRoutes = require("./routes/electionAccessUsersRoutes");
const electionAccessGroupsRoutes = require("./routes/electionAccessGroupsRoutes"); // Kullanıcı yönlendirmelerini import ediyoruz
require("dotenv").config(); // .env dosyasını yüklemek için
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res, next) => {
    console.warn(
      `🚨 Rate limit aşıldı! IP: ${req.ip}, URL: ${req.originalUrl}`
    );
    res
      .status(429)
      .json({
        message: "Çok fazla istek attınız, lütfen daha sonra tekrar deneyin.",
      });
  },
});
app.use(limiter);

app.use(express.json());

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/userAdresses", userAdressRoute);
app.use("/api/ElectionAccesUsers", electionAccessUsersRoutes);
app.use("/api/ElectionAccesGroups", electionAccessGroupsRoutes);

// PostgreSQL bağlantısını sağlıyoruz

sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(5004, () => console.log("User Service running on port 5001"));
});
