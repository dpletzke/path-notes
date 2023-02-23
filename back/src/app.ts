import fastify, { FastifyInstance } from "fastify";
// import autoLoad from "@fastify/autoload";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
import plugins from "./plugins";
import routes from "./routes";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const server: FastifyInstance = fastify({
  logger: true,
});

server.register(plugins.db);

server.register(routes.dev, { prefix: "/dev" });
server.register(routes.path, { prefix: "/path" });

// server.register(autoLoad, {
//   dir: path.join(__dirname, "routes"),
// });

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
