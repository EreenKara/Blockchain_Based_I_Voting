const UserAdress = require("../models/UserAdress");
const User = require("../models/User"); // 🟢 User modelini dahil et
require('dotenv').config();
const axios = require("axios");

const createUserAdress = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

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
                message: "cityId, districtId, neighbourhoodId, and buildingNumber are required",
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
        const [cityResponse, districtResponse, neighbourhoodResponse] = await Promise.all([
            axios.get(`${process.env.ADDRESS_SERVICE_URL}/api/cities/getCityById/${cityId}`),
            axios.get(`${process.env.ADDRESS_SERVICE_URL}/api/districts/getDistrictById/${districtId}`),
            axios.get(`${process.env.ADDRESS_SERVICE_URL}/api/neighbourhoods/getNeighbourhoodById/${neighbourhoodId}`)
        ]);

        // Yanıtların doğru yapılandırıldığından emin olun ve doğru alanlara erişin
        const cityName = cityResponse.data.city?.name || "Unknown City";
        const districtName = districtResponse.data.districts?.name || "Unknown District";
        const neighbourhoodName = neighbourhoodResponse.data.neighboorhood?.name || "Unknown Neighbourhood";

        res.status(201).json({
            message: "User address created successfully",
            userAdress: {
                id: userAdress.id,
                userId: userAdress.userId,
                city: cityName,
                district: districtName,
                neighbourhood: neighbourhoodName,
                buildingNumber: userAdress.buildingNumber
            }
        });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

const authenticateUser = async (token) => {
    if (!token) {
        throw new Error('Token is required');
    }

    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auths/validate`, { token });
        console.log('Axios Response:', response.data); // 🟢 Dönen veriyi kontrol et

        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Invalid response format from authentication service');
        }

        if (!response.data.valid) {
            throw new Error('Invalid token');
        }

        if (!response.data.decoded || typeof response.data.decoded !== 'object') {
            throw new Error('Decoded token data is missing');
        }

        console.log('Decoded Token:', response.data.decoded); // 🟢 Token içeriğini logla

        const { userId, email, hasPaidBalance } = response.data.decoded;

        if (!userId) {
            throw new Error("User ID is missing in the token payload");
        }

        return { id: userId, email, hasPaidBalance };

    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw new Error('Error verifying token');
    }
};


const getAddressByUserId = async (userId) => {
    try {
        // Kullanıcıya ait adresleri UserAdress modelinden al
        const userAddress = await UserAdress.findOne({
            where: { userId: userId }
        });

        if (!userAddress) {
            throw new Error("Address not found for this user");
        }

        return userAddress;
    } catch (error) {
        console.error("Error fetching address for user:", error.message);
        throw new Error("Error fetching address for user");
    }
};



module.exports={createUserAdress,authenticateUser,getAddressByUserId};