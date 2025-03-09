const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", // SMTP servis sağlayıcısı
  auth: {
    user: process.env.EMAIL_USER, // E-posta adresi
    pass: process.env.EMAIL_PASS, // E-posta şifresi
  },
});

const sendVerificationEmail = async (to, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Hesap Onayı",
    text: `Hesabınızı onaylamak için lütfen şu kodu girin: ${code}`,
    html: `<p>Hesabınızı onaylamak için lütfen şu kodu girin: <strong>${code}</strong></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail gönderildi: " + info.response);
  } catch (error) {
    console.error("Mail gönderme hatası: ", error);
  }
};

const sendPasswordResetEmail = async (to, resetLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Şifre Sıfırlama",
    text: `Şifrenizi sıfırlamak için lütfen şu linki kullanın: ${resetLink}`,
    html: `<p>Şifrenizi sıfırlamak için lütfen şu linki kullanın: <a href="${resetLink}">Şifreyi sıfırla</a></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail gönderildi: " + info.response);
  } catch (error) {
    console.error("Mail gönderme hatası: ", error);
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
