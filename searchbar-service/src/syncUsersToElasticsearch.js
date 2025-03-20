require("dotenv").config();

const axios = require("axios");
const { bulkIndexUsers } = require("./services/elasticsearchService");

console.log("🔍 Kullanıcıları çekme URL'si:", process.env.USER_SERVICE_URL);
console.log("🔍 Elasticsearch URL'si:", process.env.ELASTICSEARCH_URL);

const syncUsers = async () => {
    try {
        if (!process.env.USER_SERVICE_URL || !process.env.ELASTICSEARCH_URL) {
            throw new Error("❌ Ortam değişkenleri tanımlanmamış! Lütfen .env dosyasını kontrol edin.");
        }

        // User mikroservisinden tüm kullanıcıları getir
        const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/users/getusers`);
        const users = response.data;

        if (users.length > 0) {
            await bulkIndexUsers(users);
            console.log("✅ Kullanıcılar Elasticsearch’e başarıyla aktarıldı.");
        } else {
            console.log("⚠ Elasticsearch için eklenecek kullanıcı bulunamadı.");
        }
    } catch (error) {
        console.error("❌ Elasticsearch senkronizasyon hatası:", error.message);
    }
};

syncUsers();
