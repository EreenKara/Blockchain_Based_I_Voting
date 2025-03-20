const elasticClient = require("../config/elasticsearch");

const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Elasticsearch'te full-text search
        const { hits } = await elasticClient.search({
            index: "users",
            body: {
                query: {
                    match: { name: query } // Kullanıcı ismine göre arama yap
                }
            }
        });

        res.json({
            success: true,
            data: hits.hits.map(hit => hit._source)
        });
    } catch (error) {
        console.error("❌ Arama hatası:", error.message);
        res.status(500).json({ message: "An error occurred while searching users" });
    }
};

module.exports = { searchUsers };
