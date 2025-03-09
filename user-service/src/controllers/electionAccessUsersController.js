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
    res
      .status(500)
      .json({
        message: "Kullanıcı veya grup seçime erişilirken hata oluştu.",
        error: error.message,
      });
  }
};
const getUsersWithAccessToElectionController = async (req, res) => {
  try {
    // Seçim ID'sini al
    const { electionId } = req.params;

    // Parametrenin eksik olup olmadığını kontrol et
    if (!electionId) {
      return res
        .status(400)
        .json({ message: "Eksik parametre: electionId gereklidir." });
    }

    // Kullanıcıları getir
    const response = await getUsersWithAccessToElection(electionId);

    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }

    res
      .status(200)
      .json({ success: true, message: response.message, data: response.data });
  } catch (error) {
    console.error("Hata:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Seçime erişimi olan kullanıcıları getirirken hata oluştu.",
        error: error.message,
      });
  }
};

module.exports = {
  addAccessUserToElectionController,
  getUsersWithAccessToElectionController,
};
