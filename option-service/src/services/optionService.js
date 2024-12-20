const Option = require("../models/Option");
const axios = require("axios");

const createOption = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  const {  optionName, optionImgUrl, optionDescription, optionCount } =
    req.body;
  try {
    const user = await authenticateUser(token);
    console.log("Authenticated User:", user);

    if (!user || !user.email) {
      return res.status(403).json({
        message: "Access denied: Only businesses can create elections",
      });
    }

    const option = new Option({
      id: new Date().getTime(),
      optionName,
      optionImgUrl,
      optionDescription,
      optionCount,
      createdBy: user.email,
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

//
module.exports = { createOption, authenticateUser };
