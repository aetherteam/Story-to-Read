const auth = require("../classes/auth.js");

async function routes(fastify, options) {
    fastify.post("/auth/registration/", async (request, reply) => {
        const rp = request.body;
        const result = await auth.registration(
            rp.email,
            rp.password,
            rp.passwordConfirmation,
            rp.username,
            rp.nickname
        );

        if (result.success) {
            reply.code(200).send({ data: result.data });
        } else {
            reply.code(result.code).send({ message: result.message });
        }
    });
    fastify.get("/auth/login/:login/:password/", async (request, reply) => {
        const rp = request.params;

        const result = await auth.login(rp.login, rp.password);

        if (result.success) {
            reply.code(200).send({ data: result.data });
        } else {
            reply.code(result.code).send({ message: result.message });
        }
    });
}

module.exports = routes;
