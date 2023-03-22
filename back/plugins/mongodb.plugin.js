const mongodb = require("mongodb");
const fp = require("fastify-plugin");
require("dotenv").config();

module.exports = fp(async function (fastify, opts) {
  console.log(process.env.MONGO_URI);
  const client = await mongodb.MongoClient.connect(
    process.env.MONGO_URI,
    opts.options
  );
  const db = client.db(opts.dbName);
  fastify.decorate("mongo", db);
});
