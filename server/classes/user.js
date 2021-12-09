const mongo = require("../utils/mongodb.js");
const fs = require("fs");
const results = require("../utils/results");

// TODO: create easy get function that returns everything but the statistics objects;
// TODO: create simple OOP structure for User class: public and private methods
//       public methods should use private ones etc.
// TODO: user.get public and private functions
// TODO: add try/catch to all methods

module.exports = {
    create: async function (username, nickname, email, password, tempUser) {
        const usersCollection = global.mongo.collection("users");
        const userID = tempUser.id;
        const userKey = tempUser.key;

        if (!(await compareKeyAndID(userID, userKey))) {
            return results.error(
                "You are not allowed to create user with that id",
                403
            );
        } else {
            console.log("key and id is equal");
        }

        let user = {
            username,
            nickname,
            email,
            password,
            confirmed: false,
            key: generateUserKey(32),
            registered: true,
            timestamp: Date.now(),
        };

        try {
            await usersCollection.updateOne({ _id: userID }, { $set: user });
            const userForReturn = await module.exports.get(userID);
            return results.successWithData(userForReturn.data);
        } catch {
            return results.error("Unexpected error", 500);
        }
    },
    isExists: async function (query) {
        const usersCollection = global.mongo.collection("users");

        try {
            const user = await usersCollection.findOne(query);
            if (user) {
                console.log(
                    `[User] with ${query?.email} ${query?.nickname} parameters exists`
                );
                return { result: true, user: user };
            } else {
                return { result: false };
            }
        } catch {
            return results.unexpectedError();
        }
    },
    findLoginCredientials: async function (query) {
        console.log(`[User] searching ${query} credientials`);

        const usersCollection = global.mongo.collection("users");

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
        const usersCollection = global.mongo.collection("users");

        const user = await usersCollection.findOne({ key: key });

        if (user) return user;
        return false;
    },
    get: async function (id, fields) {
        const usersCollection = global.mongo.collection("users");

        if (!fields) fields = ["username", "nickname", "avatar"]; // default value

        let projection = { _id: 1 };

        fields.forEach((field) => {
            if (!restrictedProjectionFields.includes(field))
                projection[field] = 1;
        });

        try {
            let user = await usersCollection.findOne(
                { _id: id },
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
            return results.error("User not found", 400);
        } catch {
            return results.unexpectedError();
        }
    },
    getMultiple: async function () {
        const usersCollection = global.mongo.collection("users");

        //TODO: finish
    },
    update: async function (key, updatedFileds) {
        const usersCollection = global.mongo.collection("users");
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
    createTempUser: async function () {
        const usersCollection = global.mongo.collection("users");
        const userID = await mongo.getIDForNewEntry("users");

        const user = {
            _id: userID,
            key: generateUserKey(32),
            registered: false,
            timestamp: Date.now(),
        };

        const result = usersCollection.insertOne(user);

        if (result) {
            return results.successWithData(user);
        } else return results.unexpectedError();
    },
};

function generateUserKey(count) {
    let result = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < count; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

async function compareKeyAndID(id, key) {
    const usersCollection = global.mongo.collection("users");

    const userFromKey = await module.exports.getUserWithKey(key);

    return userFromKey["_id"] == id;
}

const restrictedProjectionFields = [
    "password",
    "key",
    "email",
    "confirmed",
    "registered",
];
