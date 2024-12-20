const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
