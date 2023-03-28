const fp = require("fastify-plugin");
require("dotenv").config();

module.exports = fp(async function (fastify, opts) {
  fastify.register(
    require("fastify-mongoose-driver").plugin,
    {
      uri: process.env.MONGO_URI,
      settings: {
        useNewUrlParser: true,
        config: {
          autoIndex: true,
        },
      },
      models: [
        {
          name: "users",
          alias: "User",
          schema: require("../models/user.model"),
        },
        {
          name: "tokens",
          alias: "Token",
          schema: require("../models/token.model"),
        },
      ],
    },
    (err) => {
      if (err) throw err;
    }
  );
});
