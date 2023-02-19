import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
const plugin: FastifyPluginCallback = async (server, opts, next) => {
  server.route({
    url: "/",
    logLevel: "warn",
    method: ["GET"],
    handler: async (request, reply) => {
      const data = await server?.mongo?.db
        ?.collection("path")
        .find({})
        .toArray();
      return reply.send({ data });
    },
  });
  next();
};

export default fp(plugin);
