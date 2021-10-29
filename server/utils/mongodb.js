const { MongoClient } = require("mongodb");

module.exports = {
    connect: async function() {
        return await connect();
    },
    connectWithUsersCollection: async function () {
        return await connectWithUserCollection();
    },
    connectWithBooksCollection: async function () {
        return await connectWithBooksCollection();
    },
    connectWithChaptersCollection: async function () {
        return await connectWithChaptersCollection();
    },
    getIDForNewEntry: async function (collection) {
        let db = await connect();
        db = db.collection(collection);

        let result = await db.findOne({}, { sort: ["_id", "desc"] });

        if (result) { return (result["_id"] + 1)}
        return 10000001;
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
async function connectWithBooksCollection() {
    const db = await connect();
    return db.collection("books");
}
async function connectWithChaptersCollection() {
    const db = await connect();
    return db.collection("chapters");
}