//kullanılmıyor
const jwt = require("jsonwebtoken");

const generateToken = (req, res) => {
  const { email, identityNumber } = req.body;
    if (!email || !identityNumber) {
        return res.status(400).json({ message: 'Email and identity number are required' });
    }
    const payload = { email, identityNumber };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};

// Token doğrulama
const validateToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Token geçersiz." });
  }
};


module.exports = { generateToken, validateToken };
