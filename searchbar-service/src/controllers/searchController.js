const { search } = require("../services/searchService");

// Arama endpoint'i
const searchController = async (req, res) => {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).send({ message: "Query and type are required" });
  }

  try {
    const results = await search(query, type);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { searchController };
