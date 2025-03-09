const {
  createNeighbourhood,
  getNeighbourhoodList,
  getNeighbourhoodById,
} = require("../services/neighbourhoodService");

const createNeighbourhoodController = async (req, res) => {
  try {
    await createNeighbourhood(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "an error occured while creating the neighbourhood" });
  }
};
const neighboorhoodListAll = async (req, res) => {
  try {
    const neighboorhood = await getNeighbourhoodList();
    res.status(200).json({ neighboorhood });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNeighbourhoodByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const neighboorhood = await getNeighbourhoodById(id);
    res.status(200).json({ neighboorhood });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNeighbourhoodController,
  neighboorhoodListAll,
  getNeighbourhoodByIdController,
};
