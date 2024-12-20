const express = require('express');
const mongoose = require('mongoose');
const electionRoutes = require('./routes/electionRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/elections', electionRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`eleciton service running on port ${PORT}`));