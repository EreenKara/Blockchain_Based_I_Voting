const {
  registerUser,
  authanticateUser,
  verifyCodeAndActivate,
  getUsers,
  getUserById,
  getUserByIdentityNumber,
} = require("../services/userService");

const createUser = async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    console.error("Kullanıcı oluşturulurken hata oluştu: ", error);
    res
      .status(500)
      .json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
  }
};

const login = async (req, res) => {
  try {
    await authanticateUser(req, res);
  } catch (error) {
    console.error("kullanıcı girişi başarısız", error);
    res.status(500).json({ message: "bir hata oluştu lütfen tekrar deneyin." });
  }
};
const verifyUserCodeController = async (req, res) => {
  const { emailOrIdentity, code } = req.body;

  if (!emailOrIdentity || !code) {
    return res
      .status(400)
      .json({ message: "Email/TCKN ve doğrulama kodu gereklidir." });
  }

  try {
    const result = await verifyCodeAndActivate(emailOrIdentity, code); // UserService'deki verifyCodeAndActivate metodunu çağırıyoruz
    res.status(200).json(result); // Başarılı mesajı döndürüyoruz
  } catch (error) {
    console.error("Doğrulama kodu işlemi sırasında hata oluştu: ", error);
    res
      .status(500)
      .json({
        message:
          error.message || "Doğrulama kodu işlemi sırasında hata oluştu.",
      });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users); // Kullanıcıları döndür
  } catch (error) {
    console.error("Kullanıcılar getirilirken hata oluştu: ", error);
    res
      .status(500)
      .json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
  }
};
const getUserByIdController = async (req, res) => {
  const { userId } = req.params; // URL parametresinden userId'yi al

  try {
    const user = await getUserById(userId); // userId'ye göre kullanıcıyı getir
    res.status(200).json(user); // Kullanıcıyı döndür
  } catch (error) {
    console.error("Kullanıcı bilgileri getirilirken hata oluştu: ", error);
    res.status(500).json({ message: error.message });
  }
};
const getUserByIdentityNumberController = async (req, res) => {
  const { identityNumber } = req.params; // URL parametresinden identityNumber'ı al

  try {
    const user = await getUserByIdentityNumber(identityNumber); // identityNumber'e göre kullanıcıyı getir
    res.status(200).json(user); // Kullanıcıyı döndür
  } catch (error) {
    console.error("Kullanıcı bilgileri getirilirken hata oluştu: ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  verifyUserCodeController,
  getUserByIdController,
  getUserByIdentityNumberController,
};
