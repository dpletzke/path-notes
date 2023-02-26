import fastify from "fastify";
import plugins from "./plugins";
import routes from "./routes";

const env = require("dotenv").config().parsed;

const server = fastify({
  logger: true,
});

server.register(plugins.db);

server.register(routes.dev, { prefix: "/dev" });
server.register(routes.path, { prefix: "/path" });
server.register(routes.user, { prefix: "/user" });

process.on("uncaughtException", (error) => {
  console.error(error);
});
process.on("unhandledRejection", (error) => {
  console.error(error);
});

server.listen({ port: 3000, host: env.HOST }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
