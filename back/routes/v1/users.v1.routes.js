"use strict";

const passport = require("@fastify/passport");

module.exports = async function (fastify, opts) {
  // fastify.get(
  //   "/user",
  //   {
  //     preValidation: [fastify.auth()],
  //   },
  //   async function (request, reply) {
  //     const users = await fastify.mongo.db
  //       .collection("users")
  //       .find({})
  //       .toArray();
  //     return { data: users };
  //   }
  // );

  fastify.get(
    "/user",
    {
      preValidation: [
        passport.authenticate(
          "jwt",
          { authInfo: false },
          async (request, reply, err, user, info, status) => {
            console.log({ err, user, info, status });
            if (err || info || !user) {
              return Promise.reject(new Error("Please authenticate"));
            }
          }
        ),
      ],
    },
    async function (request, reply) {
      const users = await fastify.mongo.db
        .collection("users")
        .find({})
        .toArray();
      return { data: users };
    }
  );

  fastify.post("/user", async function (request, reply) {
    const user = await fastify.mongo.db
      .collection("users")
      .insertOne(request.body);
    return { data: user };
  });

  fastify.get("/user/:id", async function (request, reply) {
    const user = await fastify.mongo.db
      .collection("users")
      .findOne({ _id: new fastify.mongo.ObjectId(request.params.id) });
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
