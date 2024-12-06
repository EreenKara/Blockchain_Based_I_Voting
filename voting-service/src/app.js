const express = require('express');
const mongoose = require('mongoose');
const votingRoutes = require('./routes/votingRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/vote-types', votingRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Voting service running on port ${PORT}`));
