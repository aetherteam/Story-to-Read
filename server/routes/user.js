const User = require("../classes/user.js");
const results = require("../utils/results.js");

async function routes(fastify, options) {
    fastify.get("/user/get/:id/:projection", async (request, reply) => {
        const userID = request.params.id;
        const projection = request.params.projection.match(/([a-z]+)/g);

        const user = await User.get(userID, projection);

        if (user.success) {
            reply.code(200).send({ data: user.data });
        } else reply.code(user.code).send({success: false, message: user.message});
    });
}

module.exports = routes;
