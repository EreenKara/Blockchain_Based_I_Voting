//kullanılmıyor
const { validateToken } = require("../utils/jwtUtils");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Erişim reddedildi. Token bulunamadı." });
  }



  try {
    const decoded = validateToken(token);
    req.user = decoded; // Token'deki payload
    next();
  } catch (error) {
    return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token." });
  }
};

module.exports = authenticate;
