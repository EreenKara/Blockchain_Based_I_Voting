const {
  addAccessUserToElection,
  getUsersWithAccessToElection,
} = require("../services/electionAccessUsersService");

const addAccessUserToElectionController = async (req, res) => {
  try {
    const { electionId, userId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Yetkilendirme hatası: Token eksik." });
    }

    if (!electionId) {
      return res
        .status(400)
        .json({ message: "Eksik parametre: electionId gereklidir." });
    }

    const response = await addAccessUserToElection(electionId, userId, token);

    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }

    res.status(200).json({ message: response.message, data: response.data });
  } catch (error) {
    console.error("Hata:", error.message);
    res.status(500).json({
      message: "Kullanıcı veya grup seçime erişilirken hata oluştu.",
      error: error.message,
    });
  }
};
const getUsersWithAccessToElectionController = async (req, res) => {
  try {
    console.log("📡 Gelen Request Params:", req.params); // electionId kontrolü
    console.log("📡 Gelen Query Params:", req.query); // page ve limit kontrolü

    const { electionId } = req.params;
    let { page, limit } = req.query;

    if (!electionId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Eksik parametre: electionId gereklidir.",
        });
    }

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    console.log(
      `✅ API Çağrısı: electionId=${electionId}, page=${page}, limit=${limit}`
    );

    const response = await getUsersWithAccessToElection(
      electionId,
      page,
      limit
    );
    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Controller Hatası:", error.message);
    res.status(500).json({
      success: false,
      message: "Beklenmeyen hata oluştu.",
      error: error.message,
    });
  }
};

module.exports = {
  addAccessUserToElectionController,
  getUsersWithAccessToElectionController,
};
