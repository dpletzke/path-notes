import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { Type } from "@sinclair/typebox";
import { utilSchemas, PathSchema, Path } from "../schemas";
interface IParams {
  id: string;
}

const GetAllPathsSchema = {
  response: {
    200: Type.Object({ data: Type.Array(PathSchema) }),
  },
};
export const routes: FastifyPluginCallback = function (server, opts, done) {
  server.route({
    url: "/",
    method: ["GET"],
    schema: GetAllPathsSchema,
    onRequest: server.auth([]),
    handler: async (_, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
        .find({})
        .toArray();
      return reply.send({ data });
    },
  });

  const GetPathSchema = {
    response: {
      200: Type.Object({ data: PathSchema }),
    },
  };
  server.route<{
    Params: IParams;
  }>({
    url: "/:id",
    method: ["GET"],
    schema: GetPathSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
        .findOne({ _id: req.params.id });
      return reply.send({ data });
    },
  });

  const PostPathSchema = {
    body: Type.Omit(PathSchema, ["_id"]),
    response: {
      200: Type.Object({ data: PathSchema }),
    },
  };

  server.route({
    url: "/",
    method: ["POST"],
    schema: PostPathSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
        .insertOne(req.body);
      return reply.send({ data });
    },
  });

  const EditPathSchema = {
    body: Type.Omit(PathSchema, ["_id"]),
    response: {
      200: Type.Object({ data: PathSchema }),
    },
  };
  server.route<{
    Params: IParams;
  }>({
    url: "/:id",
    method: ["PUT"],
    schema: EditPathSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
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
        .db!.collection("paths")
        .deleteOne({ id: req.params.id });
      return reply.send({ data });
    },
  });

  done();
};

export default fp(routes);
