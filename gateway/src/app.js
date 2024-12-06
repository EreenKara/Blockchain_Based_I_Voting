const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// User Service Routes
app.post('/api/users/register', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/users/register`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/users/login`, req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Voting Service Routes
app.post('/api/vote-types/create', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:3002/api/vote-types/create`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/vote-types', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:3002/api/vote-types`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Vote Service Routes
app.post('/api/votes/cast-vote', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:3003/api/votes/cast-vote`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/votes/votes/:voteTypeId', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:3003/api/votes/votes/${req.params.voteTypeId}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
