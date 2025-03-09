const express = require("express");
const searchRoutes = require("./routes/searchRoutes");
const sequelize = require("./config/database");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/searchs", searchRoutes);

sequelize.sync().then(() => {
  console.log("Database connected!");
  const PORT = process.env.PORT || 5009;
  app.listen(PORT, () => console.log("Election Service running on port 5002"));
});
