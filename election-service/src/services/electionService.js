const Election = require("../models/Election");
require('dotenv').config();
const axios = require("axios");

const createElection = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const { title, description, startDate, endDate } = req.body;
    if (!title || !startDate || !endDate) {
        return res.status(400).json({ message: 'Başlık, başlangıç ve bitiş tarihleri zorunludur.' });
    }

    try {
        const user = await authenticateUser(token);
        console.log('Authenticated User:', user);

        if (!user || !user.email) {
            
            return res.status(403).json({
                message: 'Access denied: Only businesses can create elections',
            });
        }

        if (!user.hasPaidBalance) {
            return res.status(403).json({
              message:
                "Access denied: You must pay the required balance to create an election.",
            });
          }
        const election = new Election({
            id: new Date().getTime(),
            title,
            description,
            startDate,
            endDate,
            createdBy: user.email,
        });
        await election.save();

        res.status(201).json({ message: 'Election created successfully', election });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};
const authenticateUser =    async (token) => {
    
    if (!token) {
        throw new Error('Token is required');
    }

    // Token doğrulamak için JWT Service'i çağır
    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/validate`, { token });
        console.log('Axios Response:', response.data);
        if (response.data.valid) {
            return response.data.decoded; // Kullanıcıyı döndür
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        throw new Error('Error verifying token');
    }
};

module.exports = { createElection, authenticateUser };
