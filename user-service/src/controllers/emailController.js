const {sendPasswordResetEmail,sendVerificationEmail} = require("../services/emailService");


const sendVerificationEmailCt = async (req, res) => {
  const { email, code } = req.body;
  try {
    await sendVerificationEmail(email, code);
    res.status(200).send("E-posta gönderildi.");
  } catch (error) {
    res.status(500).send("E-posta gönderme hatası.");
  }
};

const sendPasswordResetEmailCt = async (req, res) => {
  const { email, resetLink } = req.body;
  try {
    await sendPasswordResetEmail(email, resetLink);
    res.status(200).send("E-posta gönderildi.");
  } catch (error) {
    res.status(500).send("E-posta gönderme hatası.");
  }
};

module.exports = {
  sendVerificationEmailCt,
  sendPasswordResetEmailCt
};
