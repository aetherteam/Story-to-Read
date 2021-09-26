const validation = require("../utils/validation");
const User = require('../classes/user.js');
const { encrypt, compare } = require("../utils/encryption.js");

module.exports = {
    registration: async function (email, password, passwordConfirmation, username, nickname) {
        console.log("[Registraion] process started");

        if (!validation.email(email)
            || !validation.passwords(password, passwordConfirmation)
            || !validation.basic(username)) {
            console.log("[Registraion] one or more fields was invalid")
            return false;
        }

        if (await User.isExists({ email, nickname })) {
            return "userExists";
        }

        console.log("[Registraion] process finished with success")
        return User.create(username, nickname, email, encrypt(password));
    },
    login: async function (login, password) {
        console.log("[Login] process started");

        const userCredientials = await User.findLoginCredientials(login);

        if (!userCredientials) {
            console.log("[Login] user credentials is not found")
            return false;
        }

        console.log("[Login] user credentials: " + JSON.stringify(userCredientials));
        
        if (compare(password, userCredientials.password)) {
            return { "id": userCredientials.id, "key": userCredientials.key }
        }

        return false;
    },
    restore: async function (login) {
        // password restoration function
    }
}