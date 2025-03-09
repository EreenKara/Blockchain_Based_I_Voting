const express = require("express");
const voteRoutes = require("./routes/voteRoutes");
const sequelize = require("./config/database");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/votes", voteRoutes);

sequelize.sync().then(() => {
  console.log("Database connected!");
  const PORT = process.env.PORT || 5005;
  app.listen(PORT, () => console.log("Election Service running on port 5005"));
});


