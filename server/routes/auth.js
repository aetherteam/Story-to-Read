const auth = require("../classes/auth.js");

async function routes(fastify, options) {
    fastify.post("/auth/registration/", async (request, reply) => {
        const rp = request.body;
        
        const result = await auth.registration(
            rp.email,
            rp.password,
            rp.passwordConfirmation,
            rp.username,
            rp.nickname,
            rp.tempUserData
        );

        if (result.success) {
            reply.code(200).send({ result });
        } else {
            reply.code(result.code).send({ result });
        }
    });
    fastify.get("/auth/login/:login/:password/", async (request, reply) => {
        const rp = request.params;

        const result = await auth.login(rp.login, rp.password);

        if (result.success) {
            reply.code(200).send({ result });
        } else {
            reply.code(result.code).send({ result });
        }
    });
}

module.exports = routes;
