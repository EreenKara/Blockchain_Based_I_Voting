const Group = require("../models/Group");
const UserGroup = require("../models/UserGroup");
const {User} = require("../models/User");
require('dotenv').config();
const axios = require("axios");

// Yeni bir grup oluştur
const createGroup = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
  const { name, description } = req.body;

  try {
    const user = await authenticateUser(token);
        if (!user || !user.email || !user.hasPaidBalance) {
            return res.status(403).json({ message: 'Yetkisiz erişim veya bakiye yetersiz.' });
        }
    const group = await Group.create({ name, description,createdBy: user.email, });
    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const authenticateUser = async (token) => {
    if (!token) {
        throw new Error('Token is required');
    }

    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auths/validate`, { token });
        if (response.data.valid) {
            return response.data.decoded; // Kullanıcıyı döndür
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        throw new Error('Error verifying token');
    }
};

// Kullanıcıyı bir gruba ekle
const addUserToGroup = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const { userId, groupId } = req.body;

  try {
    // Kullanıcıyı doğrula
    const user = await authenticateUser(token);
    if (!user || !user.email || !user.hasPaidBalance) {
      return res.status(403).json({ message: "Yetkisiz erişim veya bakiye yetersiz." });
    }

    // Grubu getir ve oluşturan kişiyi kontrol et
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.createdBy !== user.email) {
      return res.status(403).json({ message: "Only the group creator can add users" });
    }

    const existingUserGroup = await UserGroup.findOne({ where: { userId, groupId } });
    if (existingUserGroup) {
      return res.status(400).json({ message: `User with ID ${userId} is already in group with ID ${groupId}.` });
    }
    // Kullanıcıyı gruba ekle
    const userGroup = await UserGroup.create({ userId, groupId });
    res.status(201).json({ message: "User added to group", userGroup });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Bir gruptaki tüm kullanıcıları getir
const getUsersInGroup = async (req, res) => {
  const groupId = Number(req.params.groupId); // ID’yi sayıya çevir

  if (isNaN(groupId)) {
    return res.status(400).json({ message: "Invalid group ID format" });
  }

  try {
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          through: { model: UserGroup }, // ✅ Ara tabloyu açıkça belirtiyoruz
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ success: true, message: "Group members fetched successfully", data: group });
  } catch (error) {
    console.error("Error fetching group members:", error.message);
    res.status(500).json({ success: false, message: "Error fetching group members", error: error.message });
  }
};

// Tüm grupları listele (Kullanıcısız)
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      attributes: ["id", "name"], // **Sadece ID ve ismi getir**
    });

    if (!groups || groups.length === 0) {
      return res.status(404).json({ message: "Henüz hiç grup oluşturulmadı." });
    }

    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    res.status(500).json({ message: "Gruplar alınırken bir hata oluştu.", error: error.message });
  }
};


module.exports = { createGroup, addUserToGroup, getUsersInGroup,getAllGroups };
