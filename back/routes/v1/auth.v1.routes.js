"use strict";

// const passport = require("@fastify/passport");

module.exports = async function (fastify) {
  fastify.post("/login", {}, async (request, reply) => {
    const { email, password } = request.body;
    const user = await authService.loginUser(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    reply.send({ user, tokens });
  });
};
