const axios = require("axios");
const { User } = require("../models/User");
const Group = require("../models/Group");
const ElectionAccessUsers = require("../models/ElectionAccessUsers");
require("dotenv").config();
const asyncHandler = require("../middlewares/asyncHandler");

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
const getUsersWithAccessToElection = async (electionId, page = 1, limit = 10) => {
  try {
      console.log(`📢 getUsersWithAccessToElection çağrıldı: electionId=${electionId}, page=${page}, limit=${limit}`);

      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const offset = (page - 1) * limit; // ✅ Sayfalama için OFFSET hesaplandı

      console.log(`🔍 Sayfa Bilgileri: Page: ${page}, Limit: ${limit}, Offset: ${offset}`);

      console.log(`📡 Seçim bilgisi çekiliyor...`);
      const response = await axios.get(`${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`);

      if (!response || !response.data || !response.data.election) {
          console.error("❌ Seçim bulunamadı veya API yanıtı hatalı!");
          return { success: false, message: "Seçim bulunamadı veya API yanıtı hatalı." };
      }

      console.log(`✅ Seçim bulundu. Kullanıcılar çekiliyor... (Limit: ${limit}, Offset: ${offset})`);

      const { count, rows } = await ElectionAccessUsers.findAndCountAll({
          where: { electionId },
          attributes: ["userId"],
          include: [{ model: User, attributes: ["id", "name", "email"] }],
          limit,
          offset,
          logging: console.log // ✅ SQL sorgusunu logla
      });

      console.log(`🔍 Kullanıcı erişim listesi alındı. Toplam Kullanıcı: ${count}, Dönen Veri: ${rows.length}`);

      if (!rows || rows.length === 0) {
          console.warn("⚠ Erişimi olan kullanıcı bulunamadı.");
          return { success: false, message: "No users have access to this election." };
      }

      const formattedUsers = rows.map(u => ({
          userId: u.userId,
          id: u.User?.id || null,
          name: u.User?.name || "Bilinmiyor",
          email: u.User?.email || "Bilinmiyor",
      }));

      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      console.log(`✅ Sayfa: ${page}/${totalPages}, Kullanıcı Sayısı: ${count}`);

      return {
          success: true,
          message: "Erişime sahip kullanıcılar başarıyla getirildi.",
          totalUsers: count,
          totalPages,
          currentPage: page,
          nextPage,
          prevPage,
          data: formattedUsers
      };

  } catch (error) {
      console.error("❌ Kullanıcıları getirirken hata oluştu:", error.message, error.stack);
      return { 
          success: false,
          message: "Seçime erişimi olan kullanıcıları getirirken hata oluştu.", 
          error: error.message 
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
