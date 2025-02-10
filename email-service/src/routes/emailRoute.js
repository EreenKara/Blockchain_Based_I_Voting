const express = require("express");
const { sendVerificationEmailCt,sendPasswordResetEmailCt} = require("../controllers/emailController");
const router = express.Router();

// Kullanıcı onayı için e-posta gönderme
router.post("/send-verification", sendVerificationEmailCt);

// Şifre sıfırlama linki gönderme
router.post("/send-password-reset", sendPasswordResetEmailCt);

module.exports = router;
