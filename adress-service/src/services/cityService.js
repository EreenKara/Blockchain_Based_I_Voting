const City = require("../models/City"); // City modelini içe aktar

const createCity = async (req, res) => {
  const { name, countryId } = req.body;

  if (!name || !countryId) {
    return res.status(400).json({ message: "city or countryId is required" });
  }
  try {
    const city = await City.create({
      name,
      countryId,
    });
    res.status(201).json({ message: "city created successfully", city });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getCityListAll = async () => {
  try {
    const cities = await City.findAll();
    return cities;
  } catch (error) {
    console.error("error:", error.message);
    throw new Error("Unable to fetch districts");
  }
};
const getCityById = async (id) => {
  try {
    console.log("Gelen ID:", id); // Debug için ID'yi yazdır

    if (!id) {
      throw new Error("ID is required");
    }

    const city = await City.findByPk(id);
    if (!city) {
      throw new Error("city is not found");
    }

    return city;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Unable to fetch city");
  }
};
module.exports = { createCity, getCityListAll, getCityById };
