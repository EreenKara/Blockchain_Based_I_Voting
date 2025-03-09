const jwt = require("jsonwebtoken");

// Token oluşturma
const generateToken = (user) => {
  const { identityNumber, email } = user;

  if (!identityNumber || !email) {
    throw new Error("Kullanıcı bilgileri eksik.");
  }

  // JWT Token oluştur
  try {
    const token = jwt.sign({ identityNumber, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  } catch (error) {
    throw new Error("Token oluşturulurken bir hata oluştu.");
  }
};

// Token doğrulama
const validateToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { identityNumber, email } = decoded;

    // Token'dan gelen bilgileri kontrol et
    if (!identityNumber || !email) {
      return res.status(401).json({ valid: false, message: "Token geçersiz." });
    }

    // Token geçerli
    res.status(200).json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Token geçersiz." });
  }
};

module.exports = { generateToken, validateToken };

// const generateToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
// };

// const verifyToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     throw new Error("Token doğrulama başarısız.");
//   }
// };
