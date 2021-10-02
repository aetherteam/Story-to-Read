const mongo = require('../utils/mongodb.js');

module.exports = {
    create: async function (username, nickname, email, password) {
        const usersCollection = await mongo.connectWithUsersCollection();

        const _id = await mongo.getIDForNewEntry("users");

        const user = {
            username,
            nickname,
            email,
            password,
            _id: _id,
            confirmed: false,
            key: generateUserKey()
        }

        if (await usersCollection.insertOne(user)) {
            return user;
        }
        else return false;
    },
    isExists: async function (query) {
        const usersCollection = await mongo.connectWithUsersCollection();

        if (await usersCollection.findOne(query)) {
            console.log(`[User] with ${query?.email} ${query?.nickname} parameters exists`)
            return true;
        }
        return false;
    },
    findLoginCredientials: async function (query) {
        console.log(`[User] searching ${query} credientials`);

        const usersCollection = await mongo.connectWithUsersCollection();

        const user = await usersCollection.findOne({ "$or": [{ "nickname": query }, { "email": query }] });

        console.log(`[User] ${query} credientials:` + JSON.stringify(user));

        if (!user) { return false; }
        return { "id": user._id, "password": user.password, "key": user.key };
    },
    getUserWithKey: async function (key) {
        const usersCollection = await mongo.connectWithUsersCollection();

        const user = usersCollection.findOne({"key": key});

        if (user) return user;
        return false;
    }
}

function generateUserKey() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}