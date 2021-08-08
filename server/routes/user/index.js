const userDataModel = require("./../../dataModels/user");
const userCtrlModel = require("./../../models/user");

module.exports = function (fastify, opts, done) {
  // Get all users
  fastify.get("/user/getAll", async (req, reply) => {
    await userCtrlModel
      .getAll(userDataModel)
      .then((res) => {
        reply.send(res, 200);
      })
      .catch((err) => {
        console.log(err, 500);
      });
  });

  // Get user by id
  fastify.get("/user/getByID", async (req, reply) => {
    await userCtrlModel
      .getByID(userDataModel, req.query)
      .then((res) => {
        reply.send(res, 200);
      })
      .catch((err) => {
        console.log(err, 500);
      });
  });

  // Create new user
  fastify.post("/user/register", async (req, reply) => {
    await userCtrlModel
      .createUser(req.body, userDataModel)
      .then((res) => {
        reply.send(res, 200);
      })
      .catch((err) => {
        console.log(err, 500);
      });
  });

  // Delete user
  fastify.post("/user/delete", async (req, reply) => {
    await userCtrlModel
      .deleteUser(req.body, userDataModel)
      .then((res) => {
        reply.send(res, 200);
      })
      .catch((err) => {
        console.log(err, 500);
      });
  });

  done();
};
