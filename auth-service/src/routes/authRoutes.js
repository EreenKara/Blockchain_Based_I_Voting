const express = require("express");
const {
  generateToken,
  validateToken,
} = require("../controllers/authController");
const router = express.Router();

// Token oluşturma
router.post("/generate", generateToken);

// Token doğrulama
router.post("/validate", validateToken);

// router.post('/auth',authenticate);

module.exports = router;
