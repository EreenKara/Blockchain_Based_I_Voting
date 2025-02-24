const  Election  = require("../models/Election");
const  Choice  = require("../models/Choice");
const ElectionChoice=require("../models/ElectionChoice");
const {Sequelize} =require("sequelize");
require('dotenv').config();
const axios = require("axios");

const createElection = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    
    const { name, description, startDate, endDate,accessType,status } = req.body;
    if (!name || !startDate || !endDate) {
        return res.status(400).json({ message: 'Başlık, başlangıç ve bitiş tarihleri zorunludur.' });
    }
    
    try {
        const user = await authenticateUser(token);
        if (!user || !user.email || !user.hasPaidBalance) {
            return res.status(403).json({ message: 'Yetkisiz erişim veya bakiye yetersiz.' });
        }
        
        const election = await Election.create({
            name,
            description,
            startDate,
            endDate,
            createdBy: user.email,
            accessType,
            step: "step1", // İlk adım
            status,
            electionType:"null"
            
        });

        res.status(201).json({ message: "Step 1: Election created successfully", election });
    } catch (error) {
        res.status(500).json({ message: "Error creating election", error: error.message });
    }
};

const addElectionType = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    const { electionId, electionType } = req.body;
    try {
        const user = await authenticateUser(token);
        if (!user || !user.email || !user.hasPaidBalance) {
            return res.status(403).json({ message: 'Yetkisiz erişim veya bakiye yetersiz.' });
        }
        const election = await Election.findByPk(electionId);
        if (!election || election.step !== "step1") {
            return res.status(400).json({ message: "Election not found or incorrect step" });
        }
        
        election.electionType = electionType;
        election.step = "step2";
        await election.save();
        
        res.status(200).json({ message: "Step 2: Election type added successfully", election });
    } catch (error) {
        res.status(500).json({ message: "Error adding election type", error: error.message });
    }
};

const addChoiceToElection = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    const { electionId, choiceIds } = req.body;
    console.log("Received electionId:", electionId);
    console.log("Received choiceIds:", choiceIds);

    if (!choiceIds || !Array.isArray(choiceIds) || choiceIds.length === 0) {
        return res.status(400).json({ message: "choiceIds array olarak gönderilmeli ve boş olmamalı." });
    }
    try {
        const user = await authenticateUser(token);
        if (!user || !user.email || !user.hasPaidBalance) {
            return res.status(403).json({ message: 'Yetkisiz erişim veya bakiye yetersiz.' });
        }
        const election = await Election.findByPk(electionId);
        if (!election || election.step !== "step2") {
            return res.status(400).json({ message: "Election not found or incorrect step" });
        }
        
        let choices;
        if (election.electionType === "blockchain") {
            choices = await getChoicesFromBlockchain(choiceIds);
        } else if (election.electionType === "database") {
            choices = await getChoicesFromDatabase(choiceIds);
        } else {
            return res.status(400).json({ message: "Invalid election type" });
        }
        
        await Promise.all(
            choices.map(choice => ElectionChoice.create({ electionId, choiceId: choice.id }))
        );
        election.step = "step3";
        await election.save();
        
        res.status(201).json({ message: "Step 3: Choices added successfully", election });
    } catch (error) {
        res.status(500).json({ message: "Error adding choices", error: error.message });
    }
};
//Blockchain'den seçenekleri almak için fonksiyon
const getChoicesFromBlockchain = async (choiceIds) => {
    try {
        console.log("Received choiceIds:", choiceIds);

        if (!choiceIds || !Array.isArray(choiceIds) || choiceIds.length === 0) {
            throw new Error("choiceIds array olarak gönderilmeli ve boş olmamalı.");
        }

        const blockchainChoices = await Choice.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: choiceIds // Dizi içindeki ID'leri filtrele
                },
                type: "blockchain"
            }
        });

        return blockchainChoices;
    } catch (error) {
        console.error("Error fetching choices from Blockchain:", error.message);
        throw new Error("Blockchain'den seçimler alınırken bir hata oluştu.");
    }
};
// Veritabanından seçimleri almak için fonksiyon
const getChoicesFromDatabase = async (choiceIds) => {
    try {
        console.log("Received choiceIds:", choiceIds);

        if (!choiceIds || !Array.isArray(choiceIds) || choiceIds.length === 0) {
            throw new Error("choiceIds array olarak gönderilmeli ve boş olmamalı.");
        }

        const databaseChoices = await Choice.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: choiceIds // Dizi içindeki ID'leri filtrele
                },
                type: "database"
            }
        });

        return databaseChoices;
    } catch (error) {
        console.error("Error fetching choices from database:", error.message);
        throw new Error("database'den seçimler alınırken bir hata oluştu.");
    }
};

// Kullanıcıyı doğrulamak için fonksiyon
const authenticateUser = async (token) => {
    if (!token) {
        throw new Error('Token is required');
    }

    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auths/validate`, { token });
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
        const election = await Election.findByPk(id);  // Sequelize: findByPk (Primary Key)
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
        const election = await Election.findByPk(id); // Sequelize: findByPk (Primary Key)
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        if (election.isActive === false) {
            return res.status(401).json({ message: "Election is not active" });
        }

        if (election.isActive === true) {
            election.isActive = false;
            await election.save();  // Sequelize: save method

            return res.status(200).json({ message: "Election status updated successfully", election });
        } else {
            return res.status(400).json({ message: "Election status update is invalid." });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the election status.", error: error.message });
    }
};





module.exports = { createElection, authenticateUser, getElectionById, updateElectionStatus,addChoiceToElection,addElectionType };
