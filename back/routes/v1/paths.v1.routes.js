"use strict";
const { Path } = require("../../models");
const { pathPostSchema } = require("../../schemas/paths.schemas");

module.exports = async function (fastify, opts) {
  fastify.get(
    "/path",
    {
      preValidation: [fastify.auth("getPaths")],
    },
    async function (request, reply) {
      const paths = await Path.find({});
      return reply.send({ data: paths });
    }
  );

  fastify.post(
    "/user/:userId/path",
    {
      preValidation: [fastify.auth("managePaths")],
      schema: pathPostSchema,
    },
    async function (request, reply) {
      const path = await path.create(request.body);
      return { data: path };
    }
  );

  fastify.get("/path/:id", async function (request, reply) {
    const path = await Path.findById(request.params.id);
    return { data: path };
  });

  fastify.put("/path/:id", async function (request, reply) {
    const path = await fastify.mongo.db
      .collection("paths")
      .updateOne(
        { _id: new fastify.mongo.ObjectId(request.params.id) },
        { $set: request.body }
      );
    return { data: path };
  });

  fastify.delete("/path/:id", async function (request, reply) {
    const response = await fastify.mongo.db
      .collection("paths")
      .deleteOne({ _id: new fastify.mongo.ObjectId(request.params.id) });
    return { data: response };
  });
};
