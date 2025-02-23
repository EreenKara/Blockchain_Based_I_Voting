const { createElection,getElectionById,updateElectionStatus,addChoiceToElection} = require("../services/electionService");
const Election = require("../models/Election");

const createElectionController = async (req, res) => {
    try {
      // console.log(req.headers.authorization)
        // Service katmanındaki createElection fonksiyonunu çağır
        await createElection(req, res);
    } catch (err) {
        console.error("Error creating election:", err.message);
        res.status(500).json({ message: "An error occurred while creating the election." });
    }
};

const getElectionByIdOnly = async (req, res) => {
  const { id } = req.params;
  try {
      const election = await Election.findByPk(id);
      if (!election) {
          return res.status(404).json({ message: "Election not found" });
      }
      res.status(200).json({ election });
  } catch (error) {
      res.status(500).json({ message: "Error fetching election", error: error.message });
  }
};
const getActiveElection = async (req, res) => {
  const { id } = req.params;
  try {
      const election = await Election.findByPk(id);
      if (!election) {
          return res.status(404).json({ message: "Election not found" });
      }
      const now = new Date();
      if (now >= election.startDate && now <= election.endDate) {
          return res.status(200).json({ message: "Election is active", election });
      } else {
          return res.status(400).json({ message: "Election cannot be started outside of start and end dates" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error starting election", error: error.message });
  }
};
const addChoiceToElectionController = async (req, res) => {
    try {
      // console.log(req.headers.authorization)
        // Service katmanındaki createElection fonksiyonunu çağır
        await addChoiceToElection(req, res);
    } catch (err) {
        console.error("Error creating election:", err.message);
        res.status(500).json({ message: "An error occurred while creating the election." });
    }
};
// const getElectionByIdController = async (req, res) => {
//   const { id } = req.params;
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//       return res.status(401).json({ message: "Authorization token is missing" });
//   }

//   try {
//       const election = await Election.findByPk(id, {
//           include: [{ model: Option, as: "options" }],
//       });
//       if (!election) {
//           return res.status(404).json({ message: "Election not found" });
//       }
//       res.status(200).json({ election, options: election.options });
//   } catch (error) {
//       res.status(500).json({ message: "Error fetching election", error: error.message });
//   }
// };

const updateElectionStatusController = async (req, res) => {
  try {
      await updateElectionStatus(req, res);
  } catch (error) {
      console.error("Error updating election status:", error.message);
      res.status(500).json({ message: "An error occurred while updating the election status." });
  }
};



  

module.exports = { createElectionController,getElectionByIdOnly,getActiveElection,updateElectionStatusController,addChoiceToElectionController};
