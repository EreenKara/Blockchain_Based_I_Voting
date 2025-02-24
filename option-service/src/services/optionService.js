const Option = require("../models/Option"); 
const axios = require("axios");

// Yeni bir seçenek oluştur
const createOption = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token kontrolü
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const { optionName, optionImgUrl, optionDescription,color, electionId, optionType, userId, guestName, guestEmail, entityName } = req.body;

  if (!optionName || !electionId || !optionType) {
    return res.status(400).json({ message: "Option name, election ID, and option type are required." });
  }

  try {
    const user = await authenticateUser(token);
    console.log("Authenticated User:", user);

    if (!user || !user.email) {
      return res.status(403).json({ message: "Access denied: Only businesses can create options" });
    }

    const election = await validateElection(electionId, token);
    if (!election) {
      return res.status(404).json({ message: "Election not found or not valid." });
    }

    if (election.createdBy !== user.email) {
      return res.status(403).json({ message: "You are not authorized to add options to this election" });
    }

    let newOptionData = {
      optionName,
      optionImgUrl,
      optionDescription,
      color,
      electionId,
      optionType,
      voteCount: 0,
    };

    if (optionType === "registered_user") {
      if (!userId) throw new Error("User ID is required for registered user option.");
      const isUserValid = await validateUser(userId);
      if (!isUserValid) throw new Error("Invalid user ID.");
      newOptionData.userId = userId;
    } else if (optionType === "guest_user") {
      if (!guestName || !guestEmail) throw new Error("Guest name and email are required for guest user.");
      newOptionData.guestName = guestName;
      newOptionData.guestEmail = guestEmail;
    } else if (optionType === "inanimate_entity") {
      if (!entityName) throw new Error("Entity name is required for inanimate entity.");
      newOptionData.entityName = entityName;
    } else {
      throw new Error("Invalid option type.");
    }

    const option = await Option.create(newOptionData);

    res.status(201).json({ message: "Option created successfully", option });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Kullanıcıyı token ile doğrula
const authenticateUser = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auths/validate`,
      { token }
    );
    return response.data.valid ? response.data.decoded : null;
  } catch (error) {
    throw new Error("Error verifying token");
  }
};

// Seçimin geçerli olup olmadığını kontrol et
const validateElection = async (electionId, token) => {
  try {
    const response = await axios.get(
      `${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.election;
  } catch (error) {
    return null;
  }
};

// Kayıtlı kullanıcı olup olmadığını kontrol et
const validateUser = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/users/${userId}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Seçime ait tüm seçenekleri getir
const getOptionsByElectionId = async (electionId) => {
  try {
    return await Option.findAll({ where: { electionId } });
  } catch (error) {
    throw new Error("Unable to fetch options");
  }
};

// Seçeneğe oy ekle
const incrementVoteCount = async (req, res) => {
  const { optionId } = req.params;
  if (!optionId) return res.status(400).json({ message: "Option ID is required." });

  try {
    const option = await Option.findOne({ where: { id: optionId } });
    if (!option) return res.status(404).json({ message: "Option not found." });

    option.voteCount += 1;
    await option.save();

    res.status(200).json({ message: "Vote count incremented successfully.", option });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while incrementing vote count." });
  }
};

module.exports = { createOption, authenticateUser, validateElection, validateUser, getOptionsByElectionId, incrementVoteCount };
