const UserAdress = require("../models/UserAdress");
const User = require("../models/User"); // 🟢 User modelini dahil et
require("dotenv").config();
const axios = require("axios");

const createUserAdress = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    // Kullanıcıyı doğrula
    const user = await authenticateUser(token);

    if (!user || !user.id) {
      return res.status(403).json({ message: "User ID not found in token" });
    }

    // Request body'den verileri al
    const { cityId, districtId, neighbourhoodId, buildingNumber } = req.body;

    if (!cityId || !districtId || !neighbourhoodId || !buildingNumber) {
      return res.status(400).json({
        message:
          "cityId, districtId, neighbourhoodId, and buildingNumber are required",
      });
    }

    console.log("Creating Address for User ID:", user.id);

    // Kullanıcının adresini oluştur
    const userAdress = await UserAdress.create({
      userId: user.id,
      cityId,
      districtId,
      neighbourhoodId,
      buildingNumber,
    });

    // 🟢 Şehir, ilçe ve mahalle adlarını almak için mikroservise istek at
    const [cityResponse, districtResponse, neighbourhoodResponse] =
      await Promise.all([
        axios.get(
          `${process.env.ADDRESS_SERVICE_URL}/api/cities/getCityById/${cityId}`
        ),
        axios.get(
          `${process.env.ADDRESS_SERVICE_URL}/api/districts/getDistrictById/${districtId}`
        ),
        axios.get(
          `${process.env.ADDRESS_SERVICE_URL}/api/neighbourhoods/getNeighbourhoodById/${neighbourhoodId}`
        ),
      ]);

    // Yanıtların doğru yapılandırıldığından emin olun ve doğru alanlara erişin
    const cityName = cityResponse.data.city?.name || "Unknown City";
    const districtName =
      districtResponse.data.districts?.name || "Unknown District";
    const neighbourhoodName =
      neighbourhoodResponse.data.neighboorhood?.name || "Unknown Neighbourhood";

    res.status(201).json({
      message: "User address created successfully",
      userAdress: {
        id: userAdress.id,
        userId: userAdress.userId,
        city: cityName,
        district: districtName,
        neighbourhood: neighbourhoodName,
        buildingNumber: userAdress.buildingNumber,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const authenticateUser = async (token) => {
  if (!token) {
    throw new Error("Token is required");
  }

  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auths/validate`,
      { token }
    );
    console.log("Axios Response:", response.data); // 🟢 Dönen veriyi kontrol et

    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid response format from authentication service");
    }

    if (!response.data.valid) {
      throw new Error("Invalid token");
    }

    if (!response.data.decoded || typeof response.data.decoded !== "object") {
      throw new Error("Decoded token data is missing");
    }

    console.log("Decoded Token:", response.data.decoded); // 🟢 Token içeriğini logla

    const { userId, email, hasPaidBalance } = response.data.decoded;

    if (!userId) {
      throw new Error("User ID is missing in the token payload");
    }

    return { id: userId, email, hasPaidBalance };
  } catch (error) {
    console.error("Error verifying token:", error.message);
    throw new Error("Error verifying token");
  }
};






const getAddressByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // ID'yi URL'den al

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "Geçersiz userId" });
    }

    // Kullanıcının adres bilgilerini al
    const userAddress = await UserAdress.findOne({
      where: { userId: parseInt(userId, 10) },
      attributes: ["id", "buildingNumber", "cityId", "districtId", "neighbourhoodId"],
    });

    if (!userAddress) {
      return res.status(404).json({ message: "Bu kullanıcı için adres bulunamadı" });
    }

    const { cityId, districtId, neighbourhoodId } = userAddress;

    console.log(`City ID: ${cityId}, District ID: ${districtId}, Neighbourhood ID: ${neighbourhoodId}`);

    // Şehir, ilçe ve mahalle bilgilerini adres mikroservisinden al
    let cityName = "Bilinmeyen Şehir";
    let districtName = "Bilinmeyen İlçe";
    let neighbourhoodName = "Bilinmeyen Mahalle";

    try {
      const cityResponse = await axios.get(`${process.env.ADDRESS_SERVICE_URL}/api/cities/getCityById/${cityId}`);
      console.log("City Response:", cityResponse.data);
      if (cityResponse.data && cityResponse.data.city && cityResponse.data.city.name) {
        cityName = cityResponse.data.city.name;
      }
    } catch (error) {
      console.error("City API Error:", error.message);
    }

    try {
      const districtResponse = await axios.get(`${process.env.ADDRESS_SERVICE_URL}/api/districts/getDistrictById/${districtId}`);
      console.log("District Response:", districtResponse.data);
      if (districtResponse.data && districtResponse.data.districts && districtResponse.data.districts.name) {
        districtName = districtResponse.data.districts.name;
      }
    } catch (error) {
      console.error("District API Error:", error.message);
    }

    try {
      const neighbourhoodResponse = await axios.get(`${process.env.ADDRESS_SERVICE_URL}/api/neighbourhoods/getNeighbourhoodById/${neighbourhoodId}`);
      console.log("Neighbourhood Response:", neighbourhoodResponse.data);
      if (neighbourhoodResponse.data && neighbourhoodResponse.data.neighboorhood && neighbourhoodResponse.data.neighboorhood.name) {
        neighbourhoodName = neighbourhoodResponse.data.neighboorhood.name;
      }
    } catch (error) {
      console.error("Neighbourhood API Error:", error.message);
    }

    // Sonuç formatı
    const formattedAddress = {
      id: userAddress.id,
      city: cityName,
      district: districtName,
      neighbourhood: neighbourhoodName,
      buildingNumber: userAddress.buildingNumber,
    };

    return res.json(formattedAddress);
  } catch (error) {
    console.error("Error fetching address for user:", error.message);
    return res.status(500).json({ message: "Adres getirme hatası", error: error.message });
  }
};






module.exports = { createUserAdress, authenticateUser, getAddressByUserId };
