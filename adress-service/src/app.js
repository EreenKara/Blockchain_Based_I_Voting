const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const cityRoutes = require("./routes/city.routes");
const districtRoutes = require("./routes/district.routes");
const neighbourhoodRoutes = require("./routes/neighbourhood.routes");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/cities", cityRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/neighbourhoods", neighbourhoodRoutes);

sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(5001, () => console.log("Address Service running on port 5001"));
});
