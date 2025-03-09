const { USE } = require("sequelize/lib/index-hints");
const Vote = require("../models/Vote");
const axios = require("axios");

const getElectionWithOptions = async (electionId, token) => {
  try {
    // Seçim bilgilerini al
    const electionResponse = await axios.get(
      `${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const election = electionResponse.data.election;

    // Seçime ait seçenekleri al
    const optionsResponse = await axios.get(
      `${process.env.OPTION_SERVICE_URL}/api/options/election/${electionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = optionsResponse.data.options;

    return { election, options };
  } catch (error) {
    console.error("Error fetching election or options:", error.message);
    throw new Error("Election or options could not be fetched.");
  }
};

const authenticateUser = async (token) => {
  if (!token) {
    throw new Error("Token is required");
  }

  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auths/validate`,
      { token }
    );
    if (response.data.valid) {
      return response.data.decoded; // Kullanıcı bilgilerini döndür
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    console.error("Error verifying token:", error.message);
    throw new Error("Error verifying token");
  }
};

const castVote = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const { electionId, optionId } = req.body;
  if (!electionId || !optionId) {
    return res
      .status(400)
      .json({ message: "Election ID and Option ID are required." });
  }

  try {
    // Kullanıcıyı doğrula
    const user = await authenticateUser(token);
    console.log(user);
    if (!user || !user.email) {
      return res
        .status(403)
        .json({ message: "Access denied: User information is invalid" });
    }

    // Seçim var mı kontrol et
    const electionResponse = await axios.get(
      `${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const election = electionResponse.data.election;

    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    if (election.accessType.toLowerCase() === "private") {
      try {
        console.log(
          `Checking user access for userId: ${user.userId} in electionId: ${electionId}`
        );

        // Kullanıcının doğrudan erişime sahip olup olmadığını kontrol et
        const accessResponse = await axios.get(
          `${process.env.USER_SERVICE_URL}/api/ElectionAccesUsers/getUsersWithAccessToElection/${electionId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(
          "User Access Response Data:",
          JSON.stringify(accessResponse.data, null, 2)
        );

        if (!accessResponse.data.success) {
          return res.status(403).json({
            message: "You do not have access to vote in this private election.",
          });
        }

        // Kullanıcı doğrudan erişime sahip mi?
        const accessUsers = accessResponse.data.data || [];
        let userHasAccess = accessUsers.some(
          (accessUser) => Number(accessUser.userId) === Number(user.userId)
        );

        if (!userHasAccess) {
          console.log(
            "User does not have direct access. Checking group access..."
          );

          // Kullanıcının dahil olduğu grupları getir
          const userGroupsResponse = await axios.get(
            `${process.env.USER_SERVICE_URL}/api/ElectionAccesGroups/getGroupsWithAccessToElection/${electionId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log(
            "User Groups Response Data:",
            JSON.stringify(userGroupsResponse.data, null, 2)
          );

          if (!userGroupsResponse.data.success) {
            return res.status(403).json({
              message:
                "You do not have access to vote in this private election.",
            });
          }

          // Kullanıcının dahil olduğu grupların bilgilerini al
          const userGroups = userGroupsResponse.data?.data || [];
          if (userGroups.length === 0) {
            return res.status(403).json({
              message:
                "You do not belong to any authorized group for this election.",
            });
          }

          console.log("User Groups Processed Data:", userGroups);

          // Kullanıcının dahil olduğu grup ID'lerini al
          const groupIds = userGroups.map((group) => group.groupId);
          console.log(`User belongs to groups: ${groupIds}`);

          // Kullanıcının dahil olduğu grupların kullanıcıları ile `userId` eşleşiyor mu?
          let userIsInAuthorizedGroup = false;

          for (const group of userGroups) {
            console.log(
              `Checking groupId: ${group.groupId} users:`,
              group.users
            );

            if (
              group.users.some(
                (member) => Number(member.id) === Number(user.userId)
              )
            ) {
              userIsInAuthorizedGroup = true;
              console.log(
                `UserId ${user.userId} found in group ${group.groupId}`
              );
              break; // Eşleşme bulunursa devam etmeye gerek yok
            }
          }

          if (!userIsInAuthorizedGroup) {
            return res.status(403).json({
              message:
                "You do not have access to vote in this private election.",
            });
          }
        }
      } catch (error) {
        console.error(
          "Error verifying user access:",
          error.response?.data || error.message
        );
        return res.status(500).json({
          message: "An error occurred while checking user access.",
          error: error.message,
        });
      }
    }

    // Seçim süresi kontrolü
    const activeResponse = await axios.get(
      `${process.env.ELECTION_SERVICE_URL}/api/elections/${electionId}/active`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (
      activeResponse.status !== 200 ||
      activeResponse.data.message !== "Election is active"
    ) {
      return res.status(400).json({
        message: activeResponse.data.message || "Election is not active",
      });
    }

    // Seçeneklerin geçerli seçimle ilişkili olup olmadığını kontrol et
    const optionsResponse = await axios.get(
      `${process.env.OPTION_SERVICE_URL}/api/options/election/${electionId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const options = optionsResponse.data.options;

    if (!options || options.length === 0) {
      return res
        .status(404)
        .json({ message: "No options found for this election." });
    }

    // Seçilen optionId'nin geçerli bir seçenek olup olmadığını kontrol et
    const selectedOption = options.find((option) => option.id == optionId);
    if (!selectedOption) {
      return res.status(400).json({
        message: `Option with ID ${optionId} is not valid for this election`,
      });
    }

    // Kullanıcı daha önce oy vermiş mi kontrol et
    const existingVote = await Vote.findOne({
      where: { electionId, votedBy: user.email },
    });
    if (existingVote) {
      return res
        .status(400)
        .json({ message: "You have already voted in this election" });
    }

    // Yeni oy oluştur ve kaydet
    const vote = await Vote.create({
      electionId,
      optionId,
      votedBy: user.email,
      votedAt: new Date(),
    });

    await axios.put(
      `${process.env.OPTION_SERVICE_URL}/api/options/${optionId}/increment-vote`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.status(201).json({ message: "Vote cast successfully", vote });
  } catch (err) {
    console.error("Error casting vote:", err.message);
    if (err.response && err.response.data && err.response.data.message) {
      return res
        .status(err.response.status)
        .json({ message: err.response.data.message });
    }
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "An error occurred while casting the vote" });
    }
  }
};

const getResults = async (req, res) => {
  try {
    const votes = await Vote.findAll({
      where: { electionId },
    });

    if (votes.length === 0) {
      return { message: "No votes found for this election." };
    }

    const optionsResponse = await axios.get(
      `${process.env.OPTION_SERVICE_URL}/api/options/election/${electionId}`
    );
    const options = optionsResponse.data.options;

    const results = votes.reduce((acc, vote) => {
      const option = options.find((opt) => opt.id === vote.optionId);
      const optionName = option ? option.name : "Unknown Option";

      if (!acc[optionName]) {
        acc[optionName] = 0;
      }
      acc[optionName] += 1;

      return acc;
    }, {});

    return { electionId, results };
  } catch (error) {
    console.error("Error fetching election results:", error.message);
    return { message: "An error occurred while fetching election results." };
  }
};

module.exports = { getElectionWithOptions, castVote, getResults };
