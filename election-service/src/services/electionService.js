const  Election  = require("../models/Election");
const  Choice  = require("../models/Choice");
const ElectionChoice=require("../models/ElectionChoice");
const {Sequelize} =require("sequelize");
require('dotenv').config();
const axios = require("axios");
const asyncHandler = require("../middlewares/asyncHandler");

const createElection = asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    
    const { name, description, startDate, endDate,accessType,electionType } = req.body;
    if (!name || !startDate || !endDate) {
        return res.status(400).json({ message: 'Başlık, başlangıç ve bitiş tarihleri zorunludur.' });
    }
    
    
        const user = await authenticateUser(token);
        if (!user || !user.email || !user.hasPaidBalance) {
            return res.status(403).json({ message: 'Yetkisiz erişim veya bakiye yetersiz.' });
        }
        
        const election = await Election.create({
            name,
            description,
            startDate,
            endDate,
            createdBy: user.email,
            accessType,
            electionType,
            step: "step1", // İlk adım
            status:"upcoming",
            
        });

        res.status(201).json({ message: "Step 1: Election created successfully", election });
    
});
const setElectionAccess = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    
    const { electionId, userId, groupId } = req.body;

    try {
        const user = await authenticateUser(token);
        if (!user || !user.email || !user.hasPaidBalance) {
            return res.status(403).json({ message: 'Yetkisiz erişim veya bakiye yetersiz.' });
        }

        const election = await Election.findByPk(electionId);
        if (!election || election.step !== "step1") {
            return res.status(400).json({ message: "Election not found or incorrect step" });
        }

        if (election.accessType === "private") {
            let successUser = true;
            let successGroup = true;

           
            if (userId) {
                try {
                    
                    const responseUser = await axios.post(
                        `${process.env.USER_SERVICE_URL}/api/ElectionAccesUsers/addAccessUserToElection`, 
                        { electionId, userId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (responseUser.status !== 200 || !responseUser.data.success!==true) {
                        successUser = false;
                        console.error("Failed to sync election user access:", responseUser.data.message);
                    }
                } catch (error) {
                    successUser = false;
                    console.error("User access API error:", error.message);
                }
            }

            if (groupId) {
                try {
                    
                    const responseGroup = await axios.post(
                        `${process.env.USER_SERVICE_URL}/api/ElectionAccesGroups/addAccessGroupToElection`, 
                        { electionId, groupId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (responseGroup.status !== 200 || !responseGroup.data.success!==true) {
                        successGroup = false;
                        console.error("Failed to sync election group access:", responseGroup.data.message);
                    }
                } catch (error) {
                    successGroup = false;
                    console.error("Group access API error:", error.message);
                }
            }

            // ✅ Eğer hem kullanıcı hem de grup ekleme başarılıysa step güncelle
            if (successUser && successGroup) {
                election.step = "step2";
                await election.save();
                return res.status(200).json({ message: "Step 2: Election access set successfully", election });
            } else {
                return res.status(500).json({ message: "Failed to add access for users or groups." });
            }
        } else {
            console.log("Public election access configuration is not implemented yet.");
            return res.status(400).json({ message: "Public election access not implemented yet." });
        }
    } catch (error) {
        console.error("Error setting election access:", error.message);
        res.status(500).json({ message: "Error setting election access", error: error.message });
    }
};

const updateElectionAccess = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.error("❌ Hata: Authorization token is missing");
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    
    const { electionId, userId, groupId } = req.body;
    console.log(`📢 Gelen İstek - electionId: ${electionId}, userId: ${userId}, groupId: ${groupId}`);

    try {
        const user = await authenticateUser(token);
        if (!user || !user.email || !user.hasPaidBalance) {
            console.error("❌ Yetkisiz erişim: Kullanıcı doğrulanamadı veya bakiyesi yetersiz.");
            return res.status(403).json({ message: 'Yetkisiz erişim veya bakiye yetersiz.' });
        }

        const election = await Election.findByPk(electionId);
        if (!election || election.step !== "step2") {
            console.error("❌ Seçim bulunamadı veya yanlış aşamada:", electionId);
            return res.status(400).json({ message: "Election not found or incorrect step" });
        }

        if (election.createdBy !== user.email) {
            console.error("❌ Yetkisiz erişim: Seçimi sadece oluşturan kişi güncelleyebilir.");
            return res.status(403).json({ message: "Only the creator of the election can update access." });
        }

        let successUser = true;
        let successGroup = true;

        // ✅ Kullanıcı ekleme işlemi
        if (userId) {
            try {
                console.log(`🔍 Kullanıcı erişim kontrolü başlatıldı - electionId: ${electionId}`);

                const checkUserResponse = await axios.get(
                    `${process.env.USER_SERVICE_URL}/api/ElectionAccesUsers/getUsersWithAccessToElection/${electionId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log("✅ Kullanıcı erişim kontrolü API cevabı:", checkUserResponse.data);

                const existingUsers = checkUserResponse.data.data.map(user => user.userId);
                if (!existingUsers.includes(userId)) {
                    console.log(`➕ Kullanıcı ekleniyor - userId: ${userId}`);

                    const responseUser = await axios.post(
                        `${process.env.USER_SERVICE_URL}/api/ElectionAccesUsers/addAccessUserToElection`,
                        { electionId, userId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    console.log("✅ Kullanıcı ekleme API cevabı:", responseUser.data);

                 
                    if (responseUser.status !== 200 || !responseUser.data || responseUser.data.message.includes("başarıyla")) {
                        console.log("✅ User başarıyla eklendi:", responseUser.data.message);
                    } else {
                        successUser = false;
                        console.error("❌ User erişim ekleme başarısız:", responseUser.data.message);
                    }
                } else {
                    console.log("ℹ Kullanıcı zaten erişime sahip, işlem atlanıyor:", userId);
                }
            } catch (error) {
                successUser = false;
                console.error("❌ Kullanıcı erişim API hatası:", error.response?.data?.message || error.message);
            }
        }

        // ✅ Grup ekleme işlemi
        if (groupId) {
            try {
                console.log(`🔍 Grup erişim kontrolü başlatıldı - electionId: ${electionId}`);

                const checkGroupResponse = await axios.get(
                    `${process.env.USER_SERVICE_URL}/api/ElectionAccesGroups/getGroupsWithAccessToElection/${electionId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log("✅ Grup erişim kontrolü API cevabı:", checkGroupResponse.data);

                const existingGroups = checkGroupResponse.data.data.map(group => group.groupId);
                if (!existingGroups.includes(groupId)) {
                    console.log(`➕ Grup ekleniyor - groupId: ${groupId}`);

                    const responseGroup = await axios.post(
                        `${process.env.USER_SERVICE_URL}/api/ElectionAccesGroups/addAccessGroupToElection`,
                        { electionId, groupId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    console.log("✅ Grup ekleme API cevabı:", responseGroup.data);

                    if (responseGroup.status !== 200 || !responseGroup.data || responseGroup.data.message.includes("başarıyla")) {
                        console.log("✅ Grup başarıyla eklendi:", responseGroup.data.message);
                    } else {
                        successGroup = false;
                        console.error("❌ Grup erişim ekleme başarısız:", responseGroup.data.message);
                    }
                } else {
                    console.log("ℹ Grup zaten erişime sahip, işlem atlanıyor:", groupId);
                }
            } catch (error) {
                successGroup = false;
                console.error("❌ Grup erişim API hatası:", error.response?.data?.message || error.message);
            }
        }

        // ✅ Eğer erişimler başarılıysa seçim stepi güncelle
        if (successUser && successGroup) {
            console.log("🎉 Erişim başarıyla güncellendi!");
            return res.status(200).json({ message: "Election access updated successfully", election });
        } else {
            console.error("❌ Kullanıcı veya grup erişimi güncellenemedi.");
            return res.status(500).json({ message: "Failed to update access for users or groups." });
        }
    } catch (error) {
        console.error("❌ Genel hata:", error.message);
        res.status(500).json({ message: "Error updating election access", error: error.message });
    }
};



const addChoiceToElection = asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    const { electionId, choiceIds } = req.body;
    console.log("Received electionId:", electionId);
    console.log("Received choiceIds:", choiceIds);

    if (!choiceIds || !Array.isArray(choiceIds) || choiceIds.length === 0) {
        return res.status(400).json({ message: "choiceIds array olarak gönderilmeli ve boş olmamalı." });
    }
    
        const user = await authenticateUser(token);
        if (!user || !user.email || !user.hasPaidBalance) {
            return res.status(403).json({ message: 'Yetkisiz erişim veya bakiye yetersiz.' });
        }
        const election = await Election.findByPk(electionId);
        if (!election || election.step !== "step2") {
            return res.status(400).json({ message: "Election not found or incorrect step" });
        }
        
        let choices;
        if (election.electionType === "blockchain") {
            choices = await getChoicesFromBlockchain(choiceIds);
        } else if (election.electionType === "database") {
            choices = await getChoicesFromDatabase(choiceIds);
        } else {
            return res.status(400).json({ message: "Invalid election type" });
        }
        
        await Promise.all(
            choices.map(choice => ElectionChoice.create({ electionId, choiceId: choice.id }))
        );
        election.step = "step3";
        await election.save();
        
        res.status(201).json({ message: "Step 3: Choices added successfully", election });
  
});
//Blockchain'den seçenekleri almak için fonksiyon
const getChoicesFromBlockchain = asyncHandler(async (choiceIds) => {
    
        console.log("Received choiceIds:", choiceIds);

        if (!choiceIds || !Array.isArray(choiceIds) || choiceIds.length === 0) {
            throw new Error("choiceIds array olarak gönderilmeli ve boş olmamalı.");
        }

        const blockchainChoices = await Choice.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: choiceIds // Dizi içindeki ID'leri filtrele
                },
                type: "blockchain"
            }
        });

        return blockchainChoices;
   
});
// Veritabanından seçimleri almak için fonksiyon
const getChoicesFromDatabase = asyncHandler(async (choiceIds) => {
    
        console.log("Received choiceIds:", choiceIds);

        if (!choiceIds || !Array.isArray(choiceIds) || choiceIds.length === 0) {
            throw new Error("choiceIds array olarak gönderilmeli ve boş olmamalı.");
        }

        const databaseChoices = await Choice.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: choiceIds // Dizi içindeki ID'leri filtrele
                },
                type: "database"
            }
        });

        return databaseChoices;
  
});

// Kullanıcıyı doğrulamak için fonksiyon
const authenticateUser = async (token) => {
    if (!token) {
        throw new Error('Token is required');
    }

    
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auths/validate`, { token });
        if (response.data.valid) {
            return response.data.decoded; // Kullanıcıyı döndür
        } else {
            throw new Error('Invalid token');
        }
  
};

const getElectionById = async (id, token) => {
    try {
        const election = await Election.findByPk(id);  // Sequelize: findByPk (Primary Key)
        if (!election) {
            throw new Error("Election not found");
        }

        // Option Service'e istek yaparak seçimle ilgili optionsları al
        const response = await axios.get(
            `${process.env.OPTION_SERVICE_URL}/api/options/election/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const options = response.data.options || [];
        return { election, options };
    } catch (error) {
        console.error("Error fetching election with options:", error.message);
        throw new Error("Unable to fetch election details");
    }
};

const updateElectionStatus = asyncHandler(async (req, res) => {
    const { id } = req.params; // Seçim ID'si

   
        // Seçimi ID'ye göre bul
        const election = await Election.findByPk(id);

        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }

        // Eğer seçim zaten COMPLETED durumundaysa işlem yapılmamalı
        if (election.status === "completed") {
            return res.status(400).json({ message: "Election is already completed." });
        }

        // Eğer seçim ACTIVE ise, COMPLETED olarak güncelle
        if (election.status === "active") {
            election.status = "completed";
            await election.save();

            return res.status(200).json({ message: "Election status updated to COMPLETED successfully", election });
        }

        // Eğer seçim ACTIVE değilse geçersiz bir durumdur
        return res.status(400).json({ message: "Election status update is invalid. Only ACTIVE elections can be completed." });

  
});

const getActiveElection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
        const election = await Election.findByPk(id);
        if (!election) {
            return res.status(404).json({ message: "Election not found" });
        }
        const now = new Date();
        if (now >= election.startDate && now <= election.endDate) {
            return res.status(200).json({ message: "Election is active", election });
        } else {
            return res.status(400).json({ message: "Election cannot be started outside of start and end dates" });
        }
  
  });
//   const updateElectionStatusIfActive = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Seçimi ID ile bul
//         const election = await Election.findByPk(id);
//         if (!election) {
//             return res.status(404).json({ message: "Election not found" });
//         }

//         const now = new Date();

//         // Eğer seçim upcoming ve tarih aralığındaysa active yap
//         if (election.status === "upcoming" && now >= election.startDate && now <= election.endDate) {
//             election.status = "active";
//             await election.save(); // Güncellenmiş durumu kaydet

//             return res.status(200).json({ message: "Election status updated to ACTIVE", election });
//         }

//         return res.status(400).json({ message: "Election status update conditions not met." });

//     } catch (error) {
//         res.status(500).json({ message: "An error occurred while updating election status.", error: error.message });
//     }
// };






module.exports = { createElection, authenticateUser, getElectionById, updateElectionStatus,addChoiceToElection,setElectionAccess,getActiveElection,updateElectionAccess };
