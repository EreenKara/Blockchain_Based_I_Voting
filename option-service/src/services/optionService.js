const Option = require("../models/Option");
const axios = require("axios");
const mongoose = require('mongoose');

const createOption = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  const { optionName, optionImgUrl, optionDescription, electionId } = req.body;

  if (!optionName || !electionId) {
    return res.status(400).json({ message: "Option name and election ID are required." });
  }
  try {
    const user = await authenticateUser(token);
    console.log("Authenticated User:", user);


    if (!user || !user.email) {
      return res.status(403).json({
        message: "Access denied: Only businesses can create elections",
      });
    }
    const election = await validateElection(electionId, token);
    if (!election) {
      return res.status(404).json({ message: "Election not found or not valid." });
    }

    if (election.createdBy !== user.email) {
      throw new Error("You are not authorized to add options to this election");
  }
    const option = new Option({
       optionId: new mongoose.Types.ObjectId().toString(),
      optionName,
      optionImgUrl,
      optionDescription,
      electionId,
      createdBy: user.email,
      voteCount:0,
    });
    await option.save();
    res.status(201).json({ message: "Option created successfully", option });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const authenticateUser = async (token) => {
  if (!token) {
    throw new Error("Token is required");
  }

  // Token doğrulamak için JWT Service'i çağır
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/validate`,
      { token }
    );
    console.log("Axios Response:", response.data);
    if (response.data.valid) {
      return response.data.decoded; // Kullanıcıyı döndür
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    throw new Error("Error verifying token");
  }
};
const validateElection = async (electionId, token) => {
  try {
    const response = await axios.get(`${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.election; // Seçim bilgisini döndür
  } catch (error) {
    console.error("Error validating election:", error);
    return null; // Geçerli bir seçim bulunamadı
  }
};
const getOptionsByElectionId = async (electionId) => {
  try {
      const options = await Option.find({ electionId });
      return options;
  } catch (error) {
      console.error("Error fetching options:", error.message);
      throw new Error("Unable to fetch options");
  }
};
const incrementVoteCount = async (req, res) => {
  const { optionId } = req.params;

  if (!optionId) {
    return res.status(400).json({ message: "Option ID is required." });
  }

  try {
    // Option'ı bul ve voteCount değerini artır
    const option = await Option.findByIdAndUpdate(
      optionId,
      { $inc: { voteCount: 1 } },
      { new: true }
    );

    if (!option) {
      return res.status(404).json({ message: "Option not found." });
    }

    res.status(200).json({ message: "Vote count incremented successfully.", option });
  } catch (error) {
    console.error("Error incrementing vote count:", error.message);
    res.status(500).json({ message: "An error occurred while incrementing vote count." });
  }
};




module.exports = { createOption, authenticateUser,validateElection ,getOptionsByElectionId,incrementVoteCount};


