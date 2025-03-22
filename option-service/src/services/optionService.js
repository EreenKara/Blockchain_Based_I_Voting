const Option = require("../models/Option");
const axios = require("axios");

// Yeni bir seçenek oluştur
const createOption = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token kontrolü
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const {
    optionName,
    optionImgUrl,
    optionDescription,
    color,
    electionId,
    userId,
  } = req.body;

  if (!optionName || !electionId || !userId) {
    return res
      .status(400)
      .json({ message: "Option name, election ID, and user ID are required." });
  }

  try {
    // Kullanıcıyı doğrula
    const user = await authenticateUser(token);
    console.log("Authenticated User:", user);

    if (!user || !user.email) {
      return res
        .status(403)
        .json({ message: "Access denied: Only businesses can create options" });
    }

    // Seçimi doğrula
    const election = await validateElection(electionId, token);
    if (!election) {
      return res.status(404).json({ message: "Election not found or not valid." });
    }


    if (election.createdBy !== user.email) {
      return res
        .status(403)
        .json({
          message: "You are not authorized to add options to this election",
        });
    }
    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res
        .status(400)
        .json({ message: "Invalid user ID. No such user exists." });
    }
   const existingOption = await Option.findOne({
      where: {
        electionId,
        userId,
      },
    });

    if (existingOption) {
      return res.status(400).json({
        message: "This user has already been added to this election as an option.",
      });
    }
    // userId belirleme mantığı
    let userType = "registered";
    if (userId == 1) {
      userType = "guest"; // Misafir kullanıcı
    } else if (userId == 2) {
      userType = "non-human"; // Cansız varlık
    }

    const existingOptions = await getOptionsByElectionId(electionId);

    // Eğer seçimde daha önce eklenen seçenekler varsa, onların türünü kontrol et
    if (existingOptions.length > 0) {
      const existingUserType =
        existingOptions[0].userId == 2 ? "non-human" : "human";

      if (
        (userType === "non-human" && existingUserType !== "non-human") ||
        (userType !== "non-human" && existingUserType === "non-human")
      ) {
        return res
          .status(400)
          .json({
            message:
              "Humans and non-humans cannot compete in the same election.",
          });
      }
    }
    // Option verisini oluştur
    let newOptionData = {
      optionName,
      optionImgUrl,
      optionDescription,
      color,
      electionId,
      voteCount: 0,
      userId,
    };
    

    const newOption = await Option.create(newOptionData);

    res.status(201).json({
      message: "Option created successfully",
      option: newOption,
      userType,
    });
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
  if (!optionId)
    return res.status(400).json({ message: "Option ID is required." });

  try {
    const option = await Option.findOne({ where: { id: optionId } });
    if (!option) return res.status(404).json({ message: "Option not found." });

    option.voteCount += 1;
    await option.save();

    res
      .status(200)
      .json({ message: "Vote count incremented successfully.", option });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while incrementing vote count." });
  }
};

module.exports = {
  createOption,
  authenticateUser,
  validateElection,
  validateUser,
  getOptionsByElectionId,
  incrementVoteCount,
};
