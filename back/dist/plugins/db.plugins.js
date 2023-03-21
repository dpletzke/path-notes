var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fp from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
const env = require("dotenv").config().parsed;
const plugin = (server, opts, next) => __awaiter(void 0, void 0, void 0, function* () {
    server.register(fastifyMongo, {
        forceClose: true,
        url: env.MONGO_URI,
        database: env.MONGO_DB_NAME,
    });
    next();
});
export default fp(plugin);
//# sourceMappingURL=db.plugins.js.map