const express = require("express");
const bodyParser = require("body-parser");
const emailRouter = require("./routes/emailRoute");

const app = express();

app.use(bodyParser.json());
app.use("/email", emailRouter);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Mail service running on port ${PORT}`));