const {createChoice,getAllChoices } = require("../services/choiceService");
const Choice = require("../models/Choice");

const createChoiceController = async (req, res) => {
    try {
 
        await createChoice(req, res);
    } catch (err) {
        console.error("Error creating election:", err.message);
        res.status(500).json({ message: "An error occurred while creating the election." });
    }
};

const getAllChoicesController = async (req, res) => {
    try {
      const users = await getAllChoices();
      res.status(200).json(users); // Kullanıcıları döndür
    } catch (error) {
      console.error("Kullanıcılar getirilirken hata oluştu: ", error);
      res.status(500).json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
  };


module.exports={createChoiceController,getAllChoicesController};