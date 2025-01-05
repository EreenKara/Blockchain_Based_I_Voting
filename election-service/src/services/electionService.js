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
const getElectionById = async (id, token) => {
    try {
        const election = await Election.findById(id);
        if (!election) {
            throw new Error("Election not found");
        }

        // Option Service'e istek yaparak seçimle ilgili optionsları al
        const response = await axios.get(
            `${process.env.OPTION_SERVICE_URL}/api/options/election/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const options = response.data.options || [];
        return { election, options };
    } catch (error) {
        console.error("Error fetching election with options:", error.message);
        throw new Error("Unable to fetch election details");
    }
};
const updateElectionStatus = async (req, res) => {
    const { id } = req.params; // Seçim ID'si
    const { isActive } = req.body; // Yeni aktiflik durumu

    try {
        const election = await Election.findById(id);
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        if(election.isActive===false){
            return res.status(401).json({message:"Election is not active"})
        }
        if (election.isActive === true) {
            election.isActive = false;
            await election.save();

            return res.status(200).json({ message: "Election status updated successfully", election });
        } else {
            return res.status(400).json({ message: "Election status update is invalid." });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the election status.", error: error.message });
    }
};


module.exports = { createElection, authenticateUser,getElectionById,updateElectionStatus};
