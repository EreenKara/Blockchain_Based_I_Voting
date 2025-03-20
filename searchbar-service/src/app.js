const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const searchRoutes = require("./routes/searchRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
    console.log(`🚀 Search Service running on port ${PORT}`);
});
