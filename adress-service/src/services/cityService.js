const City = require("../models/City"); // City modelini içe aktar

const CityService = {
  async getAllCities() {
    return await City.findAll();
  },

  async getCityById(id) {
    return await City.findByPk(id);
  },

  async createCity(data) {
    return await City.create(data); // Şehir oluşturma
  },

  async updateCity(id, data) {
    const city = await City.findByPk(id);
    if (!city) return null;
    return await city.update(data);
  },

  async deleteCity(id) {
    const city = await City.findByPk(id);
    if (!city) return null;
    await city.destroy();
    return true;
  }
};

module.exports = CityService;
