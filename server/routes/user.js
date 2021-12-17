const User = require("../classes/user.js");
const results = require("../utils/results.js");

async function routes(fastify, options) {
    fastify.get("/user/get", async (request, reply) => {
        const rp = request.query;

        let projection;
        if (rp?.projection) {
            projection = request.query.projection.match(/([a-z]+)/g);
        }
        else projection = null;

        const user = await User.get(rp.userID, projection);

        if (user.success) {
            reply.code(200).send({ user });
        } else reply.code(user.code).send({ user });
    });
    fastify.post("/user/createTempUser", async (request, reply) => {
        const user = await User.createTempUser();
        if (user.success) {
            reply.code(200).send({ user });
        } else reply.code(user.code).send({ user });
    });
    fastify.post("/user/edit", async (request, reply) => {
        const rp = request.body;

        const user = await User.edit(rp.userID, rp.updated);

        if (user.success) {
            reply.code(200).send({ user });
        } else reply.code(user.code).send({ user });
    });
}

module.exports = routes;