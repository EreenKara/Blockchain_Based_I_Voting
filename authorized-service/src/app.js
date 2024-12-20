const express = require('express');
const mongoose = require('mongoose');
const authorizedRoutes = require('./routes/authorizedRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/authorities', authorizedRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));