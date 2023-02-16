import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify/types/plugin";

const plugin: FastifyPluginCallback = async (server, opts, next) => {
  server.route({
    url: "/",
    logLevel: "warn",
    method: ["GET"],
    handler: async (request, reply) => {
      return reply.send({ date: new Date(), works: true });
    },
  });
  next();
};

export default fp(plugin);
