const { getElectionWithOptions, castVote, getResults } = require("../services/voteService");

const getElection = async (req, res) => {
  const { electionId } = req.params; // URL'den seçim ID'si alınır
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token alınır

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    // Seçim ve seçenekleri VoteService üzerinden al
    const electionWithOptions = await getElectionWithOptions(electionId, token);
    return res.status(200).json(electionWithOptions); // Cevap başarıyla döndürülür
  } catch (error) {
    console.error("Error fetching election details:", error.message);
    return res.status(400).json({ error: "An error occurred while fetching election details." });
  }
};

const vote = async (req, res) => {
  
  try {
    // Oy verme işlemi VoteService üzerinden gerçekleştirilir
    await castVote(req, res); // Request ve response nesneleri doğrudan geçilir
    // İşlem başarılı, cevabı burada dönmeye gerek yok çünkü castVote içinde yanıt dönülecek
  } catch (error) {
    console.error("Error casting vote:", error.message);
    return res.status(500).json({ error: "An error occurred while casting the vote." });
  }
};

const results = async (req, res) => {
  const { electionId } = req.params; // URL'den seçim ID'si alınır

  if (!electionId) {
    return res.status(400).json({ message: "Election ID is required." });
  }

  try {
    // Sonuçları VoteService üzerinden al
    const electionResults = await getResults(electionId);
    return res.status(200).json({ results: electionResults });
  } catch (error) {
    console.error("Error fetching election results:", error.message);
    return res.status(500).json({ error: "An error occurred while fetching election results." });
  }
};

module.exports = { getElection, vote, results };
