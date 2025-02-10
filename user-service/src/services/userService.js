const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const axios = require("axios");
const { Op } = require('sequelize');

const registerUser = async (req, res) => {
  try {
    const { name, surname, identityNumber, email, phoneNumber, password } = req.body;

    // Boş alan kontrolü
    if (!name || !surname || !identityNumber || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "Tüm alanlar doldurulmalıdır." });
    }

    // İsim ve soyisim yalnızca harflerden oluşmalı
    const nameRegex = /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: "İsim yalnızca harflerden oluşmalıdır." });
    }

    if (!nameRegex.test(surname)) {
      return res.status(400).json({ message: "Soyisim yalnızca harflerden oluşmalıdır." });
    }

    // TC kimlik numarası uzunluk kontrolü
    if (identityNumber.length !== 11) {
      return res.status(400).json({ message: "TC kimlik numarası 11 haneli olmalıdır." });
    }

    // Unique alanların kontrolü
    const existingIdentity = await User.findOne({ where: { identityNumber } });
    if (existingIdentity) {
      return res.status(409).json({ message: "Bu TC kimlik numarası zaten kayıtlı." });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: "Bu e-posta adresi zaten kayıtlı." });
    }

    const existingPhone = await User.findOne({ where: { phoneNumber } });
    if (existingPhone) {
      return res.status(409).json({ message: "Bu telefon numarası zaten kayıtlı." });
    }

    // Şifreyi hashle
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = await User.create({
      name,
      surname,
      identityNumber,
      email,
      phoneNumber,
      password: hashedPassword,
      hasPaidBalance: false,
    });

    // Doğrulama kodunu oluştur (6 basamaklı rastgele bir sayı)
    const verificationCode = Math.floor(100000 + Math.random() * 900000); 

    // Kullanıcıya e-posta ile doğrulama kodu gönder
    try {
      await axios.post(`${process.env.EMAIL_SERVICE_URL}/email/send-verification`, {
        email: user.email,
        code: verificationCode
      });

      // Doğrulama kodunu veritabanına kaydet
      user.verificationCode = verificationCode;
      await user.save();

      // Yanıt gönder
      res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu ve e-posta ile doğrulama kodu gönderildi." });

    } catch (error) {
      console.error("E-posta gönderme hatası: ", error);
      res.status(500).json({ message: "Kullanıcı oluşturuldu ancak e-posta gönderilemedi." });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kullanıcı oluşturulurken bir hata oluştu." });
  }
};
const authanticateUser = async (req, res) => {
  try {
    const { emailOrIdentity, password } = req.body;

    if (!emailOrIdentity || !password) {
      return res.status(400).json({ message: "Email/TCKN ve şifre gereklidir." });
    }

    const user = await User.findOne({
      where: { 
        [Op.or]: [{ email: emailOrIdentity }, { identityNumber: emailOrIdentity }] 
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Geçersiz email/TCKN veya şifre." });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Şifre geçersiz." });
    }
    if (user.verificationCode) {
      return res.status(403).json({ message: "Hesabınızı aktifleştirmek için e-posta adresinize gönderilen doğrulama kodunu girmeniz gerekmektedir." });

    }

    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/generate`, {
      email: user.email,
      hasPaidBalance: user.hasPaidBalance,
    });

    res.status(200).json({ token: response.data.token });
  } catch (error) {
    console.error("Authentication Error: ", error);

    if (error.response) {
      return res.status(error.response.status).json({ message: error.response.data.message || "Giriş sırasında hata oluştu" });
    } else if (error.request) {
      return res.status(500).json({ message: "AUTH_SERVICE'e istek atılırken bir sorun oluştu." });
    } else {
      return res.status(500).json({ message: "Giriş sırasında beklenmedik bir hata oluştu." });
    }
  }
};
const verifyCodeAndActivate = async (emailOrIdentity, code) => {
  try {
    const user = await User.findOne({
      where: { 
        [Op.or]: [{ email: emailOrIdentity }, { identityNumber: emailOrIdentity }] 
      },
    });

    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    if(user.verificationCode==null)
    {
      throw new Error("Hesabınız zaten aktifleştirilmiş.")
    }
    if (user.verificationCode !== code) {
      throw new Error("Geçersiz doğrulama kodu.");
    }

    // Doğrulama kodu doğruysa, kullanıcıyı aktifleştir
    user.verificationCode = null; // Kod null yapılır
    await user.save();

    return { message: "Hesabınız başarıyla aktifleştirildi." };
  } catch (error) {
    throw new Error(error.message || "Doğrulama işlemi sırasında hata oluştu.");
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll(); // Tüm kullanıcıları getir
    return users;
  } catch (error) {
    throw new Error("Kullanıcılar getirilirken bir hata oluştu.");
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId); // Kullanıcıyı ID'ye göre getir
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return user;
  } catch (error) {
    throw new Error("Kullanıcı bilgileri getirilirken bir hata oluştu.");
  }
};

const getUserByIdentityNumber = async (identityNumber) => {
  try {
    const user = await User.findOne({ where: { identityNumber } }); // Kullanıcıyı identityNumber'e göre getir
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return user;
  } catch (error) {
    throw new Error("Kullanıcı bilgileri getirilirken bir hata oluştu.");
  }
};

module.exports = { registerUser, authanticateUser, getUsers, getUserById,verifyCodeAndActivate, getUserByIdentityNumber };
