import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { Type } from "@sinclair/typebox";
import { User, UserSchema, utilSchemas } from "../schemas";
interface IParams {
  id: string;
}

const GetAllUsersSchema = {
  response: {
    200: Type.Object({ data: Type.Array(UserSchema) }),
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
      200: Type.Object({ data: UserSchema }),
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
    body: Type.Omit(UserSchema, ["_id", "pathIds", "profilePhoto"]),
    response: {
      200: Type.Object({ data: UserSchema }),
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
      Type.Pick(UserSchema, ["name", "email", "password", "profilePhoto"])
    ),
    response: {
      200: Type.Object({ data: UserSchema }),
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
    schema: utilSchemas.del,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .deleteOne({ id: req.params.id });
      return reply.send({ data });
    },
  });

  done();
};

export default fp(routes);
