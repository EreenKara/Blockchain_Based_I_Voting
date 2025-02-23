const Choice = require("../models/Choice"); 
const Election = require("../models/Election"); 
const ElectionChoice = require("../models/ElectionChoice"); // Many-to-Many bağlantı modeli
require("dotenv").config();
const axios = require("axios");

// 🟢 Seçenek (Choice) oluşturma
const createChoice = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        const choice = await Choice.create({ name, description });

        res.status(201).json({
            message: "Choice created successfully",
            choice: {
                id: choice.id,
                name: choice.name,
                description: choice.description
            }
        });

    } catch (error) {
        console.error("Error creating choice:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// 🟢 Tüm seçenekleri getirme
const getAllChoices = async (req, res) => {
    try {
        const choices = await Choice.findAll();
        res.status(200).json(choices);
    } catch (error) {
        console.error("Error fetching choices:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// 🟢 Bir seçimle (Election) seçenekleri ilişkilendirme
const addChoicesToElection = async (req, res) => {
    try {
        const { electionId, choiceIds } = req.body;

        if (!electionId || !Array.isArray(choiceIds) || choiceIds.length === 0) {
            return res.status(400).json({ message: "electionId and choiceIds are required" });
        }

        // 🟢 Seçimi kontrol et
        const election = await Election.findOne({ where: { id: electionId } });
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        // 🟢 Seçeneklerin var olup olmadığını kontrol et
        const choices = await Choice.findAll({ where: { id: choiceIds } });
        if (choices.length !== choiceIds.length) {
            return res.status(400).json({ message: "Some choices not found" });
        }

        // 🟢 Many-to-Many ilişkisini ekle
        await Promise.all(
            choiceIds.map(choiceId => ElectionChoice.create({ electionId, choiceId }))
        );

        res.status(201).json({ message: "Choices added to election successfully" });

    } catch (error) {
        console.error("Error adding choices to election:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// 🟢 Bir seçim için seçenekleri getir
const getChoicesByElection = async (req, res) => {
    try {
        const { electionId } = req.params;

        const election = await Election.findOne({
            where: { id: electionId },
            include: {
                model: Choice,
                through: ElectionChoice,
                as: "choices"
            }
        });

        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        res.status(200).json({
            electionId: election.id,
            electionName: election.name,
            choices: election.choices
        });

    } catch (error) {
        console.error("Error fetching election choices:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createChoice, getAllChoices, addChoicesToElection, getChoicesByElection };
