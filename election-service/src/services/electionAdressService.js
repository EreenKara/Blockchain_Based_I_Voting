const ElectionAdress = require("../models/electionAdress");
const Election = require("../models/Election"); // 🟢 Election modelini dahil et
require('dotenv').config();
const axios = require("axios");

const createElectionAdress = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    checkTokenContent(token); // 🟢 Token içeriğini logla

    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }

    try {
        // Kullanıcıyı doğrula
        const user = await authenticateUser(token);
        console.log('Authenticated User:', user);

        if (!user || !user.id) {
            return res.status(403).json({ message: "User ID not found in token" });
        }

        // Request body'den verileri al
        const { electionId, cityId, districtId, neighbourhoodId, buildingNumber } = req.body;

        if (!electionId || !cityId || !districtId || !neighbourhoodId || !buildingNumber) {
            return res.status(400).json({
                message: "electionId, city, district, neighbourhood, and buildingNumber are required",
            });
        }

        // 🟢 Seçimin sahibini kontrol et
        const election = await Election.findOne({ where: { id: electionId } });

        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        if (election.userId !== user.id) {
            return res.status(403).json({ message: "You can only add an address to your own election" });
        }

        console.log("Creating Address for Election ID:", election.id);

        // Adresi ekle
        const electionAdress = await ElectionAdress.create({
            electionId: election.id,
            cityId,
            districtId,
            neighbourhoodId,
            buildingNumber,
        });

        res.status(201).json({
            message: "Election address created successfully",
            electionAdress,
        });

    } catch (error) {
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

        if (response.data.valid) {
            console.log('Decoded Token:', response.data.decoded); // 🟢 Token içeriğini logla
        } else {
            throw new Error('Invalid token');
        }

        // 🟢 `userId` olarak gelen değeri `id` olarak mapleyelim
        const user = {
            id: response.data.decoded.userId,  // 🟢 `userId` değerini al
            email: response.data.decoded.email,
            hasPaidBalance: response.data.decoded.hasPaidBalance
        };

        if (!user.id) {
            throw new Error("User ID is missing in the token payload");
        }

        return user; // 🟢 Kullanıcı bilgilerini geri döndür
       
    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw new Error('Error verifying token');
    }
};

const checkTokenContent = (token) => {
    const jwt = require("jsonwebtoken");
    const decoded = jwt.decode(token);
    console.log("Decoded Token Content:", decoded); // 🟢 Token içeriğini göster
};

module.exports = { createElectionAdress, authenticateUser };
