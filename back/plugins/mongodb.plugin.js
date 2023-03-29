const mongoose = require("mongoose");
const fp = require("fastify-plugin");
require("dotenv").config();

module.exports = fp(async function (fastify, opts) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  mongoose.connection.once("open", () => {
    console.log("MongoDB connection established");
  });

  // fastify.decorate("mongo", () => mongoose.connection);
});
