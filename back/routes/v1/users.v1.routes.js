"use strict";
const { User } = require("../../models");
const { userPostSchema } = require("../../schemas/users.schemas");

module.exports = async function (fastify, opts) {
  fastify.get(
    "/user",
    {
      preValidation: [fastify.auth("getUsers")],
    },
    async function (request, reply) {
      const users = await User.find({});
      return reply.send({ data: users });
    }
  );

  fastify.post(
    "/user",
    {
      preValidation: [fastify.auth("manageUsers")],
      schema: userPostSchema,
    },
    async function (request, reply) {
      const user = await User.create(request.body);
      return { data: user };
    }
  );

  fastify.get("/user/:id", async function (request, reply) {
    console.log(request.params.id);
    const user = await User.findById(request.params.id);
    return { data: user };
  });

  fastify.put("/user/:id", async function (request, reply) {
    const user = await fastify.mongo.db
      .collection("users")
      .updateOne(
        { _id: new fastify.mongo.ObjectId(request.params.id) },
        { $set: request.body }
      );
    return { data: user };
  });

  fastify.delete("/user/:id", async function (request, reply) {
    const user = await fastify.mongo.db
      .collection("users")
      .deleteOne({ _id: new fastify.mongo.ObjectId(request.params.id) });
    return { data: user };
  });
};
