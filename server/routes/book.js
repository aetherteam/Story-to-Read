const Book = require("../classes/book.js");
const keyToId = require("../decorators/keyToId.js");

let create = async (request, userID) => {
    const rp = request.body;
    const result = await Book.create(
        rp.name,
        [],
        rp.genres,
        rp.description,
        userID
    );
};

async function routes(fastify, options) {
    fastify.post("/book/create/", async (request, reply) => {
        const result = await keyToId(create, request);

        if (result.success) {
            reply.code(200).send({ result });
        } else {
            reply.code(result.code).send({ result });
        }
    });
    fastify.get("/book/get/:bookID/", async (request, reply) => {
        const rp = request.params;

        const result = await Book.get(rp.bookID);

        if (result.success) {
            reply.code(200).send({ result });
        } else {
            reply.code(result.code).send({ result });
        }
    });
}

module.exports = routes;
