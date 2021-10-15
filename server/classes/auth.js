const validation = require("../utils/validation");
const User = require("../classes/user.js");
const { encrypt, compare } = require("../utils/encryption.js");
const results = require("../utils/results.js")

module.exports = {
    registration: async function (
        email,
        password,
        passwordConfirmation,
        username,
        nickname
    ) {
        console.log("[Registraion] process started");

        if (
            !validation.email(email) ||
            !validation.passwords(password, passwordConfirmation) ||
            !validation.basic(username)
        ) {
            console.log("[Registraion] one or more fields was invalid");
            return results.error("Invalid user data", 400);
        }

        if (await User.isExists({ email, nickname })) {
            return results.error("User already exists", 400)
        }

        const createdUser = await User.create(
            username,
            nickname,
            email,
            encrypt(password)
        );

        console.log(createdUser)
        if (createdUser.success) {
            console.log("[Registraion] process finished with success");
            return results.successWithData(createdUser.data);
        }
        return results.unexpectedError();
    },
    login: async function (login, password) {
        console.log("[Login] process started");

        const userCredientials = await User.findLoginCredientials(login);

        if (!userCredientials) {
            console.log("[Login] user credentials is not found");
            return false;
        }

        console.log(
            "[Login] user credentials: " + JSON.stringify(userCredientials)
        );

        if (compare(password, userCredientials.password)) {
            return { id: userCredientials.id, key: userCredientials.key };
        }

        return false;
    },
    restore: async function (login) {
        // TODO: password restoration function
    },
};
