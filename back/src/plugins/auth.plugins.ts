import fp from "fastify-plugin";
import { auth } from "../services";
import { FastifyPluginCallback } from "fastify/types/plugin";

const env = require("dotenv").config().parsed;

const plugin: FastifyPluginCallback = async (server, opts, next) => {
  server.decorate("verifyJWTandDB", auth.verifyJWTandDB);
  server.decorate("verifyUserAndPassword", auth.verifyUserAndPassword);
  next();
};

export default fp(plugin);
