const express = require('express');
const voteRoutes = require('./routes/voteRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/votes', voteRoutes);



const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Vote service running on port ${PORT}`));
