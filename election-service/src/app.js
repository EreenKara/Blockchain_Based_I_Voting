const express = require('express');
const electionRoutes = require('./routes/electionRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/elections', electionRoutes);

// PostgreSQL için Sequelize bağlantısı


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Election service running on port ${PORT}`));
