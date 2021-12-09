const User = require("./classes/user.js");
const mongodb = require("./utils/mongodb");
// Require the framework and instantiate it
const fastify = require("fastify")();
// String parser
const qs = require("qs");

//initialize global DB connection
mongodb.createGlobalConnection();

// Content Parser
fastify.register(require("fastify-formbody"), {
    parser: (str) => qs.parse(str),
});

fastify.register(require("fastify-multipart"), {
    attachFieldsToBody: true,
    limits: { fileSize: 3000000 },
});

fastify.register(require("fastify-cors"), {
    origin: "*",
});

fastify.addHook("preValidation", async (request, reply) => {
    if (request?.body?.key) { // TODO: вернуть проверку по SKIP_USER_KEY_CHECKING
        const user = await User.getUserWithKey(request.body.key);
        if (user) {
            request.body = { userID: user._id, ...request.body };
        } else {
            reply
                .code(444)
                .send("Cannot access this method without valid user key");
        }
    }
});

fastify.register(require("./routes/auth.js"));
fastify.register(require("./routes/book.js"));
fastify.register(require("./routes/uploads.js"));
fastify.register(require("./routes/user.js"));
fastify.get("/check/", async (request, reply) => {
    reply.code(200).send("Everything is working!");
});
// Run the server!
module.exports.start = async (port) => {
    try {
        console.log("Server listening at port " + port);
        await fastify.listen(port);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

const SKIP_USER_KEY_CHECKING = [
    "/auth/registration/",
    "/auth/login/",
    "/user/createTempUser",
];
