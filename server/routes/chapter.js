const Chapter = require('../classes/chapter.js');
const keyToId = require('../decorators/keyToId.js');

let create = async (request, userID) => {
    const rp = request.body;
    const result = await Chapter.create(rp.parentID, rp.name, rp.content, userID);

    return result;
}

async function routes(fastify, options) {
    fastify.post('/chapter/create/', async (request, reply) => {
        const result = keyToId(create, request);

        if (result === "forbidden") {
            reply.code(403).send({ "success": false, "message": "You are not allowed to create" })
        }
        else if (!result) {
            reply.code(500).send({ "success": false, "message": "Error" })
        }
        else if (result) {
            reply.code(200).send({ "success": true, "chapter": result })
        }
    })

    //chapter.get
}

module.exports = routes;