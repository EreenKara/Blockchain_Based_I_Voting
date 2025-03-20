const elasticClient = require("../config/elasticsearch");

const indexName = "users";

// Kullanıcıyı Elasticsearch'e ekle
const indexUser = async (user) => {
    await elasticClient.index({
        index: indexName,
        id: user.id,
        body: {
            name: user.name,
            email: user.email,
        },
    });
};

// Kullanıcıları toplu olarak Elasticsearch'e ekle
const bulkIndexUsers = async (users) => {
    const body = users.flatMap(user => [
        { index: { _index: indexName, _id: user.id } },
        { name: user.name, email: user.email }
    ]);

    await elasticClient.bulk({ refresh: true, body });
};

module.exports = { indexUser, bulkIndexUsers };
