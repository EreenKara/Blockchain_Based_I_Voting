const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

// Elasticsearch bağlantısını oluştur
const elasticClient = new Client({
    node: process.env.ELASTICSEARCH_URL || "http://elasticsearch:9200",
});

async function testConnection() {
    try {
        const health = await elasticClient.cluster.health();
        console.log("✅ Elasticsearch bağlantısı başarılıı!", health);
    } catch (error) {
        console.error("❌ Elasticsearch bağlantısı başarısız!", error);
    }
}

testConnection();
module.exports = elasticClient;
