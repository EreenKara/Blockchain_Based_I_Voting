const {createChoice,getAllChoices,addChoicesToElection,getChoicesByElection } = require("../services/choiceService");
const Choice = require("../models/Choice");

const createChoiceController = async (req, res) => {
    try {
      // console.log(req.headers.authorization)
        // Service katmanındaki createElection fonksiyonunu çağır
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
  const addChoicesToElectionController = async (req, res) => {
    try {
      // console.log(req.headers.authorization)
        // Service katmanındaki createElection fonksiyonunu çağır
        await addChoicesToElection(req, res);
    } catch (err) {
        console.error("Error creating election:", err.message);
        res.status(500).json({ message: "An error occurred while creating the election." });
    }
};
const getChoicesByElectionController = async (req, res) => {
  
  
    try {
      const choices = await getChoicesByElection(electionId);
      res.status(200).json({ choices });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching options", error: error.message });
    }
  };
module.exports={createChoiceController,getAllChoicesController,addChoicesToElectionController,getChoicesByElectionController};