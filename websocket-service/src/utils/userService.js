const axios = require("axios");



async function isUserExists(userId) {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/users/${userId}`);
    return response.data && response.data.id === userId;
  } catch (err) {
    console.log("❌ User-service doğrulaması başarısız:", err.message);
    return false;
  }
}

module.exports = { isUserExists };
