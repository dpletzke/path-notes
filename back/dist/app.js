var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fastify from "fastify";
import plugins from "./plugins";
import routes from "./routes";
import fastifyOverview from "fastify-overview";
const env = require("dotenv").config().parsed;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = fastify({
            logger: true,
        });
        yield server.register(fastifyOverview, {
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
        yield server.ready();
        const appStructure = server.overview({ hideEmpty: true });
        require("fs").writeFileSync("./appStructure.json", JSON.stringify(appStructure, null, 2));
    });
}
start();
//# sourceMappingURL=app.js.map