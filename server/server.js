// Require the framework and instantiate it
const fastify = require("fastify")();
// String parser
const qs = require("qs");

// Content Parser
fastify.register(require("fastify-formbody"), {
  parser: (str) => qs.parse(str),
});

// fastify.register(require('fastify-multipart'))

<<<<<<< Updated upstream
// Declare a route
fastify.register(require("./routes/user"));

=======
fastify.register(require("fastify-cors"), {
    origin: "*",
});
//TODO: сделать хук красивее
fastify.addHook("preValidation", async (request, reply) => {
    console.log(request)
    if (!SKIP_USER_KEY_CHECKING.includes(request.routerPath)) {
        if (request.headers["content-type"].match(/(multipart\/form-data;*)/g)) {
            const usersCollection = global.mongo.collection("users");
            
            const user = await usersCollection.findOne({
                key: request.body.key.value,
            });

            if (user) {
                return { userID: parseInt(user._id), ...request.body };
            } else {
                reply
                    .code(444)
                    .send("Cannot access this method without valid user key");
            }
        }
        if (request.method === "POST") {
            const usersCollection = global.mongo.collection("users");
            
            const user = await usersCollection.findOne({
                key: request.body.key,
            });

            if (user) {
                return { userID: parseInt(user._id), ...request.body };
            } else {
                reply
                    .code(444)
                    .send("Cannot access this method without valid user key");
            }
        } else if (request.method === "GET") {
            const usersCollection = global.mongo.collection("users");

            const user = await usersCollection.findOne({
                key: request.query.key,
            });

            if (user) {
                request.query = { userID: parseInt(user._id), ...request.query };
            } else {
                reply
                    .code(444)
                    .send("Cannot access this method without valid user key");
            }
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
>>>>>>> Stashed changes
// Run the server!
module.exports.start = async (port) => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
<<<<<<< Updated upstream
=======

const SKIP_USER_KEY_CHECKING = [
    "/auth/registration",
    "/auth/login",
    "/user/createTempUser",
    "/book/getOne",
    "/book/get",
    "/user/get",
];
>>>>>>> Stashed changes
