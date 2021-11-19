const Book = require("../classes/book.js");

async function routes(fastify, options) {
    fastify.post("/book/create/", async (request, reply) => {
        console.time("Book create executed in")
        const rp = request.body;
        const result = await Book.create(
            rp.name,
            [],
            rp.genres,
            rp.description,
            rp.userID
        );

    if (result.success) {
      reply.code(200).send({ result });
    } else {
      reply.code(result.code).send({ result });
    }
    console.timeEnd("Book create executed in")
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
  fastify.post("/book/addChapter/", async (request, reply) => {
      console.time("Book addChapter executed in")
      const rp = request.body;
      const result = await Book.addChapter(
          rp.bookID,
          rp.name,
          rp.content,
          rp.userID
      );

  if (result.success) {
    reply.code(200).send({ result });
  } else {
    reply.code(result.code).send({ result });
  }
  console.timeEnd("Book addChapter executed in")
});
}

module.exports = routes;
