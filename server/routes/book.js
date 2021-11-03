const Book = require("../classes/book.js");

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
        const result = await keyToID(create, request);

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

const { getUserWithKey } = require("../classes/user")

let keyToID = async (fn, request) => {
    const id = await getUserWithKey(request.body.key);

    if (!id) {
        return false;
    }

    const result = await fn(request, userId=id["_id"])

    return result;
}

module.exports = routes;