import fp from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import { FastifyPluginCallback } from "fastify/types/plugin";

const env = require("dotenv").config().parsed;

const plugin: FastifyPluginCallback = async (server, opts, next) => {
  server.register(fastifyMongo, {
    forceClose: true,
    url: env.MONGO_URI,
    database: env.MONGO_DB_NAME,
  });

  next();
};

export default fp(plugin);
