const Neighbourhood = require("../models/Neighbourhood");

const createNeighbourhood = async (req, res) => {
  const { name, districtId } = req.body;
  if (!name || !districtId) {
    return res.status(400).json({ message: "name or districtId is required" });
  }
  try {
    const neighbourhood = await Neighbourhood.create({
      name,
      districtId,
    });
    res
      .status(201)
      .json({ message: "neighboorhood created successfully", neighbourhood });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNeighbourhoodList = async (req, res) => {
  try {
    const neighbourhood = Neighbourhood.findAll();
    return neighbourhood;
  } catch (error) {
    console.log("error:", error.message);
    throw new Error("unable to fetch neighbourhood");
  }
};

const getNeighbourhoodById = async (id) => {
  try {
    console.log("Gelen ID:", id); // Debug için ID'yi yazdır

    if (!id) {
      throw new Error("ID is required");
    }

    const neighboorhood = await Neighbourhood.findByPk(id);
    if (!neighboorhood) {
      throw new Error("Neighboorhood is not found");
    }

    return neighboorhood;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Unable to fetch neighboorhood");
  }
};
module.exports = {
  createNeighbourhood,
  getNeighbourhoodList,
  getNeighbourhoodById,
};
