//write standard fastify crud routes for users with auth

import { FastifyPluginCallback, FastifyRequest } from "fastify";
import { User } from "../types";
interface IParams {
  id: string;
}

type UserPostBody = Omit<User, "id">;

export const routes: FastifyPluginCallback = function (server, opts, done) {
  server.route<{
    Params: IParams;
  }>({
    url: "/",
    method: ["GET"],
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .find({})
        .toArray();
      return reply.send({ data });
    },
  });

  server.route<{
    Params: IParams;
  }>({
    url: "/:id",
    method: ["GET"],
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .findOne({ _id: req.params.id });
      return reply.send({ data });
    },
  });

  server.route({
    url: "/",
    method: ["POST"],
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!.collection("users")
        .insertOne(req.body as UserPostBody);
      return reply.send({ data });
    },
  });

  server.route<{
    Params: IParams;
  }>({
    url: "/:id",
    method: ["PUT"],
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
