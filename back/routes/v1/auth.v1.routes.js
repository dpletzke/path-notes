"use strict";
const httpStatus = require("http-status");
const {
  userPostSchema,
  userLoginSchema,
} = require("../../schemas/users.schemas");
const { authService, tokenService, userService } = require("../../services");

module.exports = async function (fastify) {
  fastify.post(
    "/login",
    {
      schema: userLoginSchema,
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
      );
      const tokens = await tokenService.generateAuthTokens(user);
      reply.send({ user, tokens });
    }
  );

  fastify.post(
    "/register",
    {
      schema: userPostSchema,
    },
    async (request, reply) => {
      const user = await userService.createUser(request.body);
      const tokens = await tokenService.generateAuthTokens(user);
      reply.status(httpStatus.CREATED).send({ user, tokens });
    }
  );
};
