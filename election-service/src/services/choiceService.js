const Choice = require("../models/Choice");
require("dotenv").config();

// 🟢 Seçenek (Choice) oluşturma
const createChoice = async (req, res) => {
  try {
    const { name, description, type, category } = req.body;

    // Gerekli alanların kontrolü
    if (!name || !description || !type || !category) {
      return res
        .status(400)
        .json({
          message: "Name, description, type, and category are required",
        });
    }

    // type alanı için validasyon (blockchain veya database)
    if (!["blockchain", "database"].includes(type)) {
      return res
        .status(400)
        .json({
          message: "Invalid type. It must be 'blockchain' or 'database'",
        });
    }

    // Seçenek oluşturuluyor
    const choice = await Choice.create({
      name,
      description,
      type,
      category,
    });

    res.status(201).json({
      message: "Choice created successfully",
      choice: {
        id: choice.id,
        name: choice.name,
        description: choice.description,
        type: choice.type,
        category: choice.category,
      },
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
    return choices;
  } catch (error) {
    console.error("Error fetching choices:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createChoice, getAllChoices };
