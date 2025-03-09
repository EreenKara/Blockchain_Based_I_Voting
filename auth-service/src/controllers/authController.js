const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (req, res) => {
  const { email, hasPaidBalance, userId } = req.body;
  if (!email && !hasPaidBalance && !userId) {
    return res.status(400).json({ message: "Email is required" });
  }
  const token = jwt.sign(
    {
      email,
      hasPaidBalance,
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
};

// Token doğrulama
const validateToken = (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid token" });
  }
};

module.exports = { generateToken, validateToken };
