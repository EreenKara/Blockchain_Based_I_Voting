const axios = require("axios");
const { User } = require("../models/User");
const Group = require("../models/Group");
const ElectionAccessUsers = require("../models/ElectionAccessUsers");
require("dotenv").config();

const addAccessUserToElection = async (electionId, userId, token) => {
  try {
    if (!token) {
      return { success: false, message: "Yetkilendirme hatası: Token eksik." };
    }

    const user = await authenticateUser(token);
    if (!user || !user.email) {
      return {
        success: false,
        message: "Erişim reddedildi: Geçersiz kullanıcı.",
      };
    }

    // Seçimin olup olmadığını kontrol et
    const response = await axios.get(
      `${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response || !response.data || !response.data.election) {
      return { success: false, message: "Seçim bulunamadı." };
    }

    const election = response.data.election;
    if (election.createdBy !== user.email) {
      return {
        success: false,
        message: "Bu seçime yalnızca seçim oluşturucusu erişim verebilir.",
      };
    }
    if (election.accessType.toLowerCase() !== "private") {
      return {
        success: false,
        message:
          "Bu seçime erişim eklenemez. Yalnızca private seçimlere erişim eklenebilir.",
      };
    }

    if (userId) {
      const accesUser = await User.findByPk(userId);
      if (!accesUser) {
        return { success: false, message: "Kullanıcı bulunamadı." };
      }

      const existingAccess = await ElectionAccessUsers.findOne({
        where: { electionId, userId },
      });

      if (existingAccess) {
        return {
          success: false,
          message: "Bu kullanıcı zaten seçimde erişime sahip.",
        };
      }

      await ElectionAccessUsers.create({ electionId, userId });

      return {
        success: true,
        message: `Kullanıcı ${accesUser.name} başarıyla seçime erişim hakkı kazandı.`,
        data: accesUser.name,
      };
    }

    return {
      success: false,
      message: "Geçersiz istek: userId veya groupId girilmelidir.",
    };
  } catch (error) {
    console.error("Error adding access user/group to election:", error.message);
    return { success: false, message: error.message };
  }
};
const getUsersWithAccessToElection = async (electionId) => {
  try {
    // Seçimin olup olmadığını kontrol et
    const response = await axios.get(
      `${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`
    );

    if (!response || !response.data || !response.data.election) {
      return { success: false, message: "Seçim bulunamadı." };
    }

    // Kullanıcıları getir
    const users = await ElectionAccessUsers.findAll({
      where: { electionId },
      attributes: ["userId"],
      include: [{ model: User, attributes: ["id", "name", "email"] }], // Sadece gerekli alanları al
    });

    if (!users || users.length === 0) {
      return {
        success: false,
        message: "No users have access to this election.",
      };
    }

    return {
      success: true,
      message: "Erişime sahip kullanıcılar başarıyla getirildi.",
      data: users,
    };
  } catch (error) {
    console.error(
      "Error fetching users with access to election:",
      error.message
    );
    return {
      success: false,
      message: error.message,
    };
  }
};

// Token doğrulama fonksiyonu
const authenticateUser = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auths/validate`,
      { token }
    );

    if (response.data.valid) {
      return response.data.decoded; // Kullanıcı bilgilerini döndür
    } else {
      return { success: false, message: "Token geçersiz." };
    }
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return { success: false, message: "Token doğrulama hatası." };
  }
};

module.exports = { addAccessUserToElection, getUsersWithAccessToElection };
