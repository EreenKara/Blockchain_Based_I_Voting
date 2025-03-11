const axios = require("axios");
const Group = require("../models/Group");
const { User } = require("../models/User");
const UserGroup = require("../models/UserGroup");
const ElectionAccessGroups = require("../models/ElectionAccessGroups");
require("dotenv").config();

const addAccessGroupToElection = async (electionId, groupId, token) => {
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

    if (groupId) {
      // Grubun var olup olmadığını kontrol et
      const group = await Group.findByPk(groupId);
      if (!group) {
        return { success: false, message: "Grup bulunamadı." };
      }

      // Grup zaten eklenmiş mi kontrol et
      const existingGroupAccess = await ElectionAccessGroups.findOne({
        where: { electionId, groupId },
      });

      if (existingGroupAccess) {
        return {
          success: false,
          message: "Bu grup zaten seçimde erişime sahip.",
        };
      }

      // Grubu seçime ekle
      await ElectionAccessGroups.create({ electionId, groupId });

      return {
        success: true,
        message: `Grup ${group.name} başarıyla seçime erişim hakkı kazandı.`,
        data: group.name,
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

// const getGroupsWithAccessToElection = async (electionId) => {
//     try {
//         // Seçimin olup olmadığını kontrol et
//         const response = await axios.get(
//             `${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`
//         );

//         if (!response || !response.data || !response.data.election) {
//             return { success: false, message: "Seçim bulunamadı." };
//         }

//         console.log("ElectionAccessGroups Associations:", ElectionAccessGroups.associations);
//         // Seçime erişimi olan grupları getir
//         const groups = await ElectionAccessGroups.findAll({
//             where: { electionId },
//             attributes: ["groupId"],
//             include: [{ model: Group, attributes: ["id", "name"] }],

//         });

//         console.log("grousp:",groups);

//         if (!groups || groups.length === 0) {
//             return { success: false, message: "Bu seçim için erişime sahip grup bulunamadı." };
//         }

//         // Her grup için kullanıcıları getir
//         const groupData = await Promise.all(groups.map(async (group) => {
//             // Gruba üye olan kullanıcıları getir
//             const users = await UserGroup.findAll({
//                 where: { groupId: group.groupId },
//                 include: [{ model: User, attributes: ["id", "name", "email"] }] // Kullanıcı bilgilerini al
//             });

//             return {
//                 groupId: group.groupId,
//                 groupName: group.Group.name,
//                 users: users.map(userGroup => ({
//                     id: userGroup.User?.id || null,
//                     name: userGroup.User?.name || "Bilinmeyen Kullanıcı",
//                     email: userGroup.User?.email || "Bilinmeyen Email"
//                 }))
//             };
//         }));

//         return {
//             success: true,
//             message: "Erişime sahip gruplar ve üyeleri başarıyla getirildi.",
//             data: groupData
//         };
//     } catch (error) {
//         console.error("Error fetching groups with access to election:", error.message);
//         return {
//             success: false,
//             message: error.message
//         };
//     }
// };
const getElectionAccessGroups = async (electionId, page = 1, limit = 10) => {
  try {
      console.log(`📢 getGroupsWithAccessToElection çağrıldı: electionId=${electionId}, page=${page}, limit=${limit}`);

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

      const { count, rows } = await ElectionAccessGroups.findAndCountAll({
          where: { electionId },
          attributes: ["groupId"],
          include: [{ model: Group, attributes: ["id", "name","description"] }],
          limit,
          offset,
          logging: console.log // ✅ SQL sorgusunu logla
      });

      console.log(`🔍 Kullanıcı erişim listesi alındı. Toplam Kullanıcı: ${count}, Dönen Veri: ${rows.length}`);

      if (!rows || rows.length === 0) {
          console.warn("⚠ Erişimi olan kullanıcı bulunamadı.");
          return { success: false, message: "No Groups have access to this election." };
      }

      const formattedGroups = rows.map(u => ({
          groupId: u.groupId,
          id: u.Group.id || null,
          name: u.Group.name || "Bilinmiyor",
          description:u.Group.description||"Bilinmiyor"
      }));

      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      console.log(`✅ Sayfa: ${page}/${totalPages}, Kullanıcı Sayısı: ${count}`);

      return {
          success: true,
          message: "Erişime sahip kullanıcılar başarıyla getirildi.",
          totalGroups: count,
          totalPages,
          currentPage: page,
          nextPage,
          prevPage,
          data: formattedGroups
      };

  } catch (error) {
      console.error("❌ Grupları getirirken hata oluştu:", error.message, error.stack);
      return { 
          success: false,
          message: "Seçime erişimi olan grupları getirirken hata oluştu.", 
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

module.exports = { addAccessGroupToElection, getElectionAccessGroups };
