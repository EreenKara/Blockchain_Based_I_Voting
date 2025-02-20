const CityService = require("../services/cityService");

const CityController = {
  async getAllCities(req, res) {
    try {
      const cities = await CityService.getAllCities();
      res.json(cities);
    } catch (err) {
      res.status(500).json({ message: "Error fetching cities" });
    }
  },

  async getCityById(req, res) {
    try {
      const city = await CityService.getCityById(req.params.id);
      if (!city) {
        return res.status(404).json({ message: "City not found" });
      }
      res.json(city);
    } catch (err) {
      res.status(500).json({ message: "Error fetching city" });
    }
  },

  async createCity(req, res) {
    try {
      const { name, cityId } = req.body;
      const district = await districtService.createDistrict(name, cityId);
      return res.status(201).json(district);
    } catch (error) {
      console.error("Controller - Error creating district:", error);
      return res.status(500).json({ message: "Error creating district", error: error.message });
    }
  },

  async updateCity(req, res) {
    try {
      const updatedCity = await CityService.updateCity(req.params.id, req.body);
      if (!updatedCity) {
        return res.status(404).json({ message: "City not found" });
      }
      res.json(updatedCity);
    } catch (err) {
      res.status(500).json({ message: "Error updating city" });
    }
  },

  async deleteCity(req, res) {
    try {
      const isDeleted = await CityService.deleteCity(req.params.id);
      if (!isDeleted) {
        return res.status(404).json({ message: "City not found" });
      }
      res.json({ message: "City deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting city" });
    }
  }
};

module.exports = CityController;
