const express = require("express");
const mongoose = require("mongoose");
const resultRoutes = require("./routes/resultRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/results", resultRoutes);

const PORT = process.env.PORT || 3002;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Result service running on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
