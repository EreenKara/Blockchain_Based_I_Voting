const Election = require("../models/election.model");
const Option = require("../models/option.model");

class SearchbarService {
  // Ortak arama fonksiyonu
  async search(query, type) {
    if (type === "election") {
      return this.searchElection(query); // Seçimlerde arama
    } else if (type === "option") {
      return this.searchOption(query); // Seçeneklerde arama
    }
    return [];
  }

  // Seçimlerde arama fonksiyonu
  async searchElection(query) {
    return await Election.find({
      name: { $regex: query, $options: "i" }, // MongoDB araması
    });
  }

  // Seçeneklerde arama fonksiyonu
  async searchOption(query) {
    return await Option.find({
      name: { $regex: query, $options: "i" }, // MongoDB araması
    });
  }
}

module.exports = new SearchbarService();
