const mongo = require('../utils/mongodb.js');

module.exports = {
    create: async function (username, nickname, email, password) {
        const usersCollection = await mongo.connectWithUserCollection();

        let currentHighestID = await usersCollection.findOne({}, { sort: ["_id", "desc"] });

        const user = {
            username,
            nickname,
            email,
            password,
            _id: parseInt(currentHighestID._id) + 1,
            confirmed: false,
            key: module.exports.generateUserKey()
        }

        if (await usersCollection.insertOne(user)) {
            return user;
        }
        else return false;
    },
    isExists: async function (query) {
        const usersCollection = await mongo.connectWithUserCollection();

        if (await usersCollection.findOne(query)) {
            console.log(`[User] with ${query?.email} ${query?.nickname} parameters exists`)
            return true;
        }
        return false;
    },
    findLoginCredientials: async function (query) {
        console.log(`[User] searching ${query} credientials`);

        const usersCollection = await mongo.connectWithUserCollection();

        const user = await usersCollection.findOne({ "$or": [{ "nickname": query }, { "email": query }] });

        console.log(`[User] ${query} credientials:` + JSON.stringify(user));

        if (!user) { return false; }

        return { "id": user._id, "password": user.password, "key": user.key };
    },
    generateUserKey: function () {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

}