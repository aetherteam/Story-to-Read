const { MongoClient } = require("mongodb");
const config = require("./config.json");

module.exports = {
    connect: async function () {
        return await connect();
    },
    getIDForNewEntry: async function (collection) {
        const db = global.mongo.collection(collection);

        let result = await db.findOne({}, { sort: ["id", "desc"] });
        console.log("new entry result", result)
        if (result) {
            return result["id"] + 1;
        }
        return 10000001;
    },
    createGlobalConnection: async function () {
        const client = new MongoClient(config.mongoConnectionString);
        await client.connect();
        console.log("[MongoDB] connection established");
        global.mongo = client.db("was");
    },
};

async function connect() {
    console.log("connecting to db...");
    const client = new MongoClient(config.mongoConnectionString);
    await client.connect();
    console.log("db connection established");
    return client.db("was");
}
