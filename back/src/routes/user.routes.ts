//write standard fastify crud routes for users with auth

import { Type } from "@sinclair/typebox";
import { FastifyPluginCallback } from "fastify";
import { DeleteSchema, User } from "../schemas";
interface IParams {
  id: string;
}

const GetAllUsersSchema = {
  response: {
    200: Type.Object({ data: Type.Array(User.Schema) }),
  },
};
export const routes: FastifyPluginCallback = function (server, opts, done) {
  server.route({
    url: "/",
    method: ["GET"],
    schema: GetAllUsersSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .find({})
        .toArray();
      return reply.send({ data });
    },
  });

  const GetUserSchema = {
    response: {
      200: Type.Object({ data: User.Schema }),
    },
  };
  server.route<{
    Params: IParams;
  }>({
    url: "/:id",
    method: ["GET"],
    schema: GetUserSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .findOne({ _id: req.params.id });
      return reply.send({ data });
    },
  });

  const PostUserSchema = {
    body: Type.Omit(User.Schema, ["_id", "pathIds", "profilePhoto"]),
    response: {
      200: Type.Object({ data: User.Schema }),
    },
  };
  server.route({
    url: "/",
    method: ["POST"],
    schema: PostUserSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .insertOne(req.body);
      return reply.send({ data });
    },
  });

  const EditUserSchema = {
    body: Type.Partial(
      Type.Pick(User.Schema, ["name", "email", "password", "profilePhoto"])
    ),
    response: {
      200: Type.Object({ data: User.Schema }),
    },
  };
  server.route<{
    Params: IParams;
  }>({
    url: "/:id",
    method: ["PUT"],
    schema: EditUserSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .updateOne({ id: req.params.id }, { $set: req.body });
      return reply.send({ data });
    },
  });

  server.route<{
    Params: IParams;
  }>({
    url: "/:id",
    method: ["DELETE"],
    schema: DeleteSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .deleteOne({ id: req.params.id });
      return reply.send({ data });
    },
  });

  done();
};

export default routes;
