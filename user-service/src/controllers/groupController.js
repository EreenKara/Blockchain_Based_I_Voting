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

    // Kullanıcıyı gruba ekle
    const userGroup = await UserGroup.create({ userId, groupId });
    res.status(201).json({ message: "User added to group", userGroup });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Bir gruptaki tüm kullanıcıları getir
const getUsersInGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId, { include: User });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createGroup, addUserToGroup, getUsersInGroup };
