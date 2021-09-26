// Require the framework and instantiate it
const fastify = require("fastify")();
// String parser
const qs = require("qs");

// Content Parser
fastify.register(require("fastify-formbody"), {
  parser: (str) => qs.parse(str),
});

// fastify.register(require('fastify-multipart'))

// Declare a route
fastify.register(require("./routes/auth.js"));

// Run the server!
module.exports.start = async (port) => {
  try {
    console.log("Server listening at port " + port);
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
