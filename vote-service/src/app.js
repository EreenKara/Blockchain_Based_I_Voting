const express = require('express');
const mongoose = require('mongoose');
const voteRoutes = require('./routes/voteRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/votes', voteRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Vote service running on port ${PORT}`));
