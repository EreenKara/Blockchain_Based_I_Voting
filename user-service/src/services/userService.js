const User = require("../models/User");
const bcrypt = require("bcrypt");
const axios = require("axios");

//const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

const registerUser = async (req, res) => {
  try {
    const { name, surname, identityNumber, email, phoneNumber, password } =
      req.body;

    // Boş alan kontrolü
    if (
      !name ||
      !surname ||
      !identityNumber ||
      !email ||
      !phoneNumber ||
      !password
    ) {
      return res.status(400).json({ message: "Tüm alanlar doldurulmalıdır." });
    }

    // İsim ve soyisim yalnızca harflerden oluşmalı
    const nameRegex = /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/;
    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ message: "İsim yalnızca harflerden oluşmalıdır." });
    }

    if (!nameRegex.test(surname)) {
      return res
        .status(400)
        .json({ message: "Soyisim yalnızca harflerden oluşmalıdır." });
    }

    // TC kimlik numarası uzunluk kontrolü
    if (identityNumber.length !== 11) {
      return res
        .status(400)
        .json({ message: "TC kimlik numarası 11 haneli olmalıdır." });
    }

    // Unique alanların kontrolü
    const existingIdentity = await User.findOne({ identityNumber });
    if (existingIdentity) {
      return res
        .status(409)
        .json({ message: "Bu TC kimlik numarası zaten kayıtlı." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ message: "Bu e-posta adresi zaten kayıtlı." });
    }

    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res
        .status(409)
        .json({ message: "Bu telefon numarası zaten kayıtlı." });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = new User({
      name,
      surname,
      identityNumber,
      email,
      phoneNumber,
      password: hashedPassword,
      hasPaidBalance: false,
    });

    // Kullanıcıyı kaydet
    await user.save();

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Kullanıcı oluşturulurken bir hata oluştu." });
  }
};

const authanticateUser = async (req, res) => {
  try {
    const { emailOrIdentity, password } = req.body;

    if (!emailOrIdentity || !password) {
      return res
        .status(400)
        .json({ message: "Email/TCKN ve şifre gereklidir." });
    }
    const user = await User.findOne({
      $or: [{ email: emailOrIdentity }, { identityNumber: emailOrIdentity }],
    });
    console.log(user.hasPaidBalance);
if (!user) {
  return res.status(401).json({ message: "Geçersiz email/TCKN veya şifre." });
}

const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return res.status(401).json({ message: "Şifre geçersiz." });
}

    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/generate`, {
      email: user.email,
      hasPaidBalance:user.hasPaidBalance
    });

    res.status(200).json({ token: response.data.token });
  } catch (error) {
    console.error("Authentication Error: ", error);

    // Hata oluştuğunda daha detaylı bilgi döndürme
    if (error.response) {
      // AUTH_SERVICE'inden dönen hata yanıtı
      return res.status(error.response.status).json({ message: error.response.data.message || "Giriş sırasında hata oluştu" });
    } else if (error.request) {
      // API'ye yapılan istek gerçekleşmedi
      return res.status(500).json({ message: "AUTH_SERVICE'e istek atılırken bir sorun oluştu." });
    } else {
      // Diğer hatalar
      return res.status(500).json({ message: "Giriş sırasında beklenmedik bir hata oluştu." });
    }
  }
};
const getUsers = async () => {
  try {
    const users = await User.find(); // Tüm kullanıcıları getir
    return users;
  } catch (error) {
    throw new Error("Kullanıcılar getirilirken bir hata oluştu.");
  }
};
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId); // Kullanıcıyı ID'ye göre getir
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
    const user = await User.findOne({ identityNumber }); // Kullanıcıyı identityNumber'e göre getir
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    return user;
  } catch (error) {
    throw new Error("Kullanıcı bilgileri getirilirken bir hata oluştu.");
  }
};

module.exports = { registerUser, authanticateUser,getUsers,getUserById,getUserByIdentityNumber};
