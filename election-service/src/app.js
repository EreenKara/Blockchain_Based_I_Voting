const express = require("express");
const electionRoutes = require("./routes/electionRoutes");
const sequelize = require("./config/database");
const choiceRoute = require("./routes/choiceRoutes");
const electionAdressRoute = require("./routes/electionAdressRoutes");
const cronJobs = require("./utils/cronJobs");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/elections", electionRoutes);
app.use("/api/choices", choiceRoute);
app.use("/api/electionAdresses", electionAdressRoute);

// PostgreSQL için Sequelize bağlantısı

sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(5001, () => console.log("Election Service running on port 5001"));
});
