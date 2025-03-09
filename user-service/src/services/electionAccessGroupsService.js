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
const getElectionAccessGroups = async (electionId) => {
  try {
    const response = await axios.get(
      `${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`
    );

    if (!response || !response.data || !response.data.election) {
      return { success: false, message: "Seçim bulunamadı." };
    }
    if (!electionId) {
      return { success: false, message: "Seçim ID belirtilmelidir." };
    }

    const accessGroups = await ElectionAccessGroups.findAll({
      where: { electionId },
      attributes: ["groupId"],
      include: [{ model: Group, attributes: ["id", "name"] }],
    });

    if (!accessGroups || accessGroups.length === 0) {
      return {
        success: false,
        message: "Bu seçim için tanımlı erişim grubu bulunmamaktadır.",
      };
    }

    return {
      success: true,
      message: "Seçime erişimi olan gruplar başarıyla getirildi.",
      data: accessGroups.map((access) => ({
        id: access.Group.id,
        name: access.Group.name,
      })),
    };
  } catch (error) {
    console.error("Error fetching election access groups:", error.message);
    return { success: false, message: error.message };
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
