import { FastifyPluginCallback, FastifyRequest } from "fastify";
import { Path } from "../types";
type IdRequest = FastifyRequest<{
  Params: {
    id: string;
  };
}>;

type PathPostBody = Omit<Path, "id">;

export const routes: FastifyPluginCallback = function (server, opts, done) {
  server.route({
    url: "/",
    method: ["GET"],
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
        .find({})
        .toArray();
      return reply.send({ data });
    },
  });

  server.route({
    url: "/:id",
    method: ["GET"],
    handler: async (req: IdRequest, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
        .findOne({ _id: req.params.id });
      return reply.send({ data });
    },
  });

  server.route({
    url: "/",
    method: ["POST"],
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
        .insertOne(req.body as PathPostBody);
      return reply.send({ data });
    },
  });

  server.route({
    url: "/:id",
    method: ["PUT"],
    handler: async (req: IdRequest, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
        .updateOne({ id: req.params.id }, { $set: req.body });
      return reply.send({ data });
    },
  });

  server.route({
    url: "/:id",
    method: ["DELETE"],
    handler: async (req: IdRequest, reply) => {
      const data = await server.mongo
        .db!.collection("paths")
        .deleteOne({ id: req.params.id });
      return reply.send({ data });
    },
  });

  done();
};

export default routes;
