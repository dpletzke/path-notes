import fp from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import { FastifyPluginCallback } from "fastify/types/plugin";

const env = require("dotenv").config().parsed;

const plugin: FastifyPluginCallback = async (server, opts, next) => {
  server.register(fastifyMongo, {
    forceClose: true,
    url: env.MONGO_URI,
  });

  // if the database connection doesn't exist, throw an error
  server.addHook("onRequest", async (req, reply) => {
    if (!server.mongo.db) {
      throw new Error("No database connection");
    }
  });

  next();
};

export default fp(plugin);
