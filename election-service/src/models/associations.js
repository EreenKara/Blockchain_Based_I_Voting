const Election = require("./Election");
const Choice = require("./Choice");
const ElectionChoice = require("./ElectionChoice");

// ✅ Çoka çok ilişkiyi burada tanımlıyoruz
Election.belongsToMany(Choice, {
  through: ElectionChoice,
  foreignKey: "electionId",
});
Choice.belongsToMany(Election, {
  through: ElectionChoice,
  foreignKey: "choiceId",
});

module.exports = { Election, Choice, ElectionChoice };
