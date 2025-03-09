// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const imageRoutes = require("./routes/imageRoutes");
const sequelize = require("./config/database"); // Sequelize bağlantınız

const app = express();
const PORT = process.env.PORT || 5008;

app.use(bodyParser.json());

// Image routes
app.use("/api/images", imageRoutes);

// Database connection and server startup
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
