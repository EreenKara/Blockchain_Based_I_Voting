const express = require('express');
const mongoose = require('mongoose');
const optionsRoutes = require('./routes/optionsRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/options', optionsRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`User and Options service running on port ${PORT}`));