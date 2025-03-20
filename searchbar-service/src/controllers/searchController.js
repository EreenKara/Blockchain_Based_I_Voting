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


const fuzzySearchUsers = async (req, res) => {
    try {
        const { query } = req.query;

        const response = await elasticClient.search({
            index: "users",
            body: {
                query: {
                    fuzzy: {
                        "name.fuzzy": {
                            value: query,
                            fuzziness: "AUTO" // Otomatik hata düzeltme
                        }
                    }
                }
            }
        });

        res.status(200).json({ success: true, data: response.hits.hits });
    } catch (error) {
        res.status(500).json({ success: false, message: "Fuzzy search sırasında hata oluştu", error: error.message });
    }
};
const autocompleteUsers = async (req, res) => {
    try {
        const { query } = req.query;

        const response = await elasticClient.search({
            index: "users",
            body: {
                query: {
                    match_phrase_prefix: {
                        "name.autocomplete": query // Autocomplete için özel alan
                    }
                }
            }
        });

        res.status(200).json({ success: true, data: response.hits.hits });
    } catch (error) {
        res.status(500).json({ success: false, message: "Autocomplete sırasında hata oluştu", error: error.message });
    }
};

module.exports = { searchUsers,fuzzySearchUsers,autocompleteUsers };
