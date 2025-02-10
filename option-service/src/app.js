const express = require('express');
const optionsRoutes = require('./routes/optionsRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/options', optionsRoutes);


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`User and Options service running on port ${PORT}`));