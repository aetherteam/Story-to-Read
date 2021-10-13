const mongo = require("../utils/mongodb.js");
const fs = require("fs");
const results = require("../utils/results");
//todo: create easy get function that returns everything but the statistics objects;
// OR
// add excepted fields to functions
// todo: use users db only for public info!!!!!!!!!!!!!!!!!!!!!!
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
            key: generateUserKey(),
        };

        if (await usersCollection.insertOne(user)) {
            const userForReturn = await module.exports.get(_id);
            return results.successWithData(userForReturn);
        } else return results.error("Unexpected error", 500);
    },
    isExists: async function (query) {
        const usersCollection = await mongo.connectWithUsersCollection();

        if (await usersCollection.findOne(query)) {
            console.log(
                `[User] with ${query?.email} ${query?.nickname} parameters exists`
            );
            return true;
        }
        return false;
    },
    findLoginCredientials: async function (query) {
        console.log(`[User] searching ${query} credientials`);

        const usersCollection = await mongo.connectWithUsersCollection();

        const user = await usersCollection.findOne({
            $or: [{ nickname: query }, { email: query }],
        });

        console.log(`[User] ${query} credientials:` + JSON.stringify(user));

        if (!user) {
            return false;
        }
        return { id: user._id, password: user.password, key: user.key };
    },
    getUserWithKey: async function (key) {
        const usersCollection = await mongo.connectWithUsersCollection();

        const userID = usersCollection.findOne({ key: key }, { _id: 1 });

        const user = await module.exports.get(userID);

        if (user) return user;
        return false;
    },
    get: async function (id, fields) {
        const usersCollection = await mongo.connectWithUsersCollection();

        if (!fields) fields = ["username", "nickname", "avatar"];

        let projection = { _id: id };

        fields.forEach((field) => {
            if (!restrictedProjectionFields.includes(field))
                projection[field] = 1;
        });

        let user = await usersCollection.findOne(
            { _id: parseInt(id) },
            { projection: projection }
        );

        if (user) {
            if (projection?.avatar) {
                if (fs.existsSync(`./uploads/avatars/${id}.png`)) {
                    user.avatar = `./uploads/avatars/${id}.png`;
                } else {
                    user.avatar = `./uploads/avatars/regular.png`;
                }
            }
            return results.successWithData(user);
        }

        //todo: add fields parameter
        return results.error("User not found", 400);
    },
    getMultipleUsers: async function () {
      const usersCollection = await mongo.connectWithUsersCollection();

      //todo: finish
    },
    update: async function (key, updatedFileds) {
        const usersCollection = await mongo.connectWithUsersCollection();
        const userID = await module.exports.getUserWithKey(key)["_id"];

        if (!userID) {
            return results.error("User not found", 400);
        }

        const updated = {
            $set: updatedFileds,
        };

        const result = usersCollection.updateOne({ _id: userID }, updated);

        if (!result) {
            return results.error("Unexpected error", 500);
        }

        return results.success();
    },
};

function generateUserKey() {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

const restrictedProjectionFields = ["password", "key", "email", "confirmed"];
