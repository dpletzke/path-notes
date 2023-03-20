import fastify from "fastify";
import plugins from "./plugins";
import routes from "./routes";
import fastifyOverview from "fastify-overview";

const env = require("dotenv").config().parsed;

async function start() {
  const server = fastify({
    logger: true,
  });

  await server.register(fastifyOverview, {
    addSource: true,
    exposeRoute: true,
  });

  server.register(plugins.db);
  server.register(plugins.auth);

  server.register(routes.dev, { prefix: "/dev" });
  server.register(routes.path, { prefix: "/path" });
  server.register(routes.user, { prefix: "/user" });

  server.listen({ port: env.PORT, host: env.HOST }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
  await server.ready();
  const appStructure = server.overview({ hideEmpty: true });
  require("fs").writeFileSync(
    "./appStructure.json",
    JSON.stringify(appStructure, null, 2)
  );
}
start();
