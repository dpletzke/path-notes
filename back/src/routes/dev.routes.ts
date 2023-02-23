import { FastifyPluginCallback } from "fastify/types/plugin";

const routes: FastifyPluginCallback = async (server, opts, next) => {
  server.route({
    url: "/status",
    logLevel: "warn",
    method: ["GET", "HEAD"],
    handler: async (request, reply) => {
      return reply.send({ date: new Date(), works: true });
    },
  });
  next();
};

export default routes;
