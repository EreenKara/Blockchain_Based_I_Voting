const { 
    createElection,
    updateElectionStatus,
    addElectionType,
    addChoiceToElection,
    getElectionById,
    getActiveElection
    
} = require("../services/electionService");

const Election = require("../models/Election");

const handleError = (res, error, message) => {
    console.error(message, error.message);
    res.status(500).json({ message });
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

const createElectionController = async (req, res) => {
    try {
        await createElection(req, res);
    } catch (err) {
        handleError(res, err, "Error creating election:");
    }
};

const addElectionTypeController = async (req, res) => {
    try {
        await addElectionType(req, res);
    } catch (error) {
        handleError(res, error, "Error adding type to election:");
    }
};

const addChoiceToElectionController = async (req, res) => {
    try {
        await addChoiceToElection(req, res);
    } catch (error) {
        handleError(res, error, "Error adding choices to election:");
    }
};

const getElectionByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const election = await getElectionById(id);
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }
        res.status(200).json({ election });
    } catch (error) {
        handleError(res, error, "Error fetching election:");
    }
};

const getActiveElectionController=async(req,res)=>{
try{
 await getActiveElection(req,res);
}catch(error){
    handleError(res, error, "Error getting active elections.:");
}
};


const updateElectionStatusController = async (req, res) => {
  try {
      await updateElectionStatus(req, res);
  } catch (error) {
      handleError(res, error, "Error updating election status:");
  }
};
// const updateElectionStatusIfActiveController=async(req,res)=>{
// try{
//  await updateElectionStatusIfActive(req,res);
// }catch(error){
// handleError(res,error,"error updating election status")
// }
// };


module.exports = { 
    createElectionController,
    getElectionByIdOnly,
    getActiveElection,
    getElectionByIdController,
    updateElectionStatusController,
    addChoiceToElectionController,
    addElectionTypeController,
    getActiveElectionController

};
