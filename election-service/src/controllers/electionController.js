const { createElection } = require("../services/electionService");

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

module.exports = { createElectionController };
