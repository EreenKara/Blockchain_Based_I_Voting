const { createElection} = require("../services/electionService");
const Election = require("../models/Election");
const axios = require("axios");

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

const getElectionById= async (req, res) => {
    const { id } = req.params;
  
    try {
      const election = await Election.findById(id);
      if (!election) {
        return res.status(404).json({ message: 'Election not found' });
      }
      const options = await Option.find({ electionId: id });
  
      res.status(200).json({ election });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching election', error: error.message });
    }
  };
  const getActiveElection= async (req, res) => {
    const { id } = req.params;
  
    try {
      const election = await Election.findById(id);
      if (!election) {
        return res.status(404).json({ message: 'Election not found' });
      }
  
      const now = new Date();
      if (now >= election.startDate && now <= election.endDate) {
        return res.status(200).json({ message: 'Election is active', election });
      } else {
        return res.status(400).json({ message: 'Election cannot be started outside of start and end dates' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error starting election', error: error.message });
    }
  };


  

module.exports = { createElectionController,getElectionById,getActiveElection};
