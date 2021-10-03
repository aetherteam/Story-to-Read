const Book = require('../classes/book.js');
const keyToId = require('../decorators/keyToId.js');

let create = async (request, userID) => {
    const rp = request.body;
    const result = await Book.create(rp.name, [], rp.genres, rp.description, userID);
}

async function routes(fastify, options) {
    fastify.post('/book/create/', async (request, reply) => {
        const result = await keyToId(create, request);

        if (result) {
            reply.code(200).send({ "success": true, "bookID": result._id });
        }
        else {
            reply.code(500).send({ "success": false, "message": "Error" });
        }
    })
    fastify.get('/book/get/:bookID/', async (request, reply) => {
        const rp = request.params;

        const result = await Book.get(rp.bookID);

        if (result) {
            reply.code(200).send({ "success": true, "book": result });
        }
        else {
            reply.code(422).send({ "success": false, "message": "Book is not exists" });
        }
    })
}

module.exports = routes;