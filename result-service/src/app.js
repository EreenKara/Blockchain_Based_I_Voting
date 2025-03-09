const express = require("express");
const resultRoutes = require("./routes/resultRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/results", resultRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () =>
  console.log(`User and Options service running on port ${PORT}`)
);
