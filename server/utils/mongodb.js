const { MongoClient } = require("mongodb");

module.exports = {
    connectWithUserCollection: async function () {
        return await connectWithUserCollection();
    }
}

async function connect() {
    const client = new MongoClient("mongodb://127.0.0.1/?writeConcern=majority");
    await client.connect();
    return client.db("was");
}
async function connectWithUserCollection() {
    const db = await connect();
    return db.collection("users");
}