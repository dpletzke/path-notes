import fastify, { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import plugins from "./plugins";
import routes from "./routes";

const server: FastifyInstance = fastify({
  logger: true,
});

server.register(plugins.db);

server.register(routes.dev);
server.register(routes.path);

process.on("uncaughtException", (error) => {
  console.error(error);
});
process.on("unhandledRejection", (error) => {
  console.error(error);
});

server
  .listen({
    port: 3000,
    host: "localhost",
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
