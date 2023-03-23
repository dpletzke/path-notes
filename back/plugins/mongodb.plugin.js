const mongodb = require("mongodb");
const fp = require("fastify-plugin");
require("dotenv").config();

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/mongodb"), {
    url: process.env.MONGO_URI,
    database: "path-notes",
    forceClose: true,
  });
});
