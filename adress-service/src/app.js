const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const cityRoutes = require("./routes/cityRoutes");
const districtRoutes = require("./routes/districtRoutes");
const neighbourhoodRoutes = require("./routes/neighbourhoodRoutes");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/cities", cityRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/neighbourhoods", neighbourhoodRoutes);

sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(5007, () => console.log("Address Service running on port 5001"));
});
