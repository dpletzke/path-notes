//write standard fastify crud routes for users with auth

import { FastifyPluginCallback } from "fastify";
import { Type } from "@sinclair/typebox";
import { authSchemas, UserSchema } from "../schemas";

export const routes: FastifyPluginCallback = function (server, opts, done) {
  const Login = {
    schema: {
      body: authSchemas.login,
      response: {
        200: Type.Object({
          data: UserSchema,
        }),
      },
    },
  };
  server.post("/", Login, async (req, reply) => {
    const data = await server.mongo.db!;
    return reply.send({ data });
  });

  const Register = {
    schema: {
      body: authSchemas.register,
      response: {
        200: Type.Object({
          data: UserSchema,
        }),
      },
    },
  };
  server.post("/register", Register, async (req, reply) => {
    const data = await server.mongo.db!;
    return reply.send({ data });
  });

  const Logout = {
    schema: {
      body: authSchemas.logout,
      response: {
        200: Type.Object({
          data: UserSchema,
        }),
      },
    },
  };
  server.post("/logout", Logout, async (req, reply) => {
    const data = await server.mongo.db!;
    return reply.send({ data });
  });

  const RefreshTokens = {
    schema: {
      body: authSchemas.refreshTokens,
      response: {
        200: Type.Object({
          data: UserSchema,
        }),
      },
    },
  };
  server.post("/refresh-tokens", RefreshTokens, async (req, reply) => {
    const data = await server.mongo.db!;
    return reply.send({ data });
  });

  const ForgotPassword = {
    schema: {
      body: authSchemas.forgotPassword,
      response: {
        200: Type.Object({
          data: UserSchema,
        }),
      },
    },
  };
  server.post("/forgot-password", ForgotPassword, async (req, reply) => {
    const data = await server.mongo.db!;
    return reply.send({ data });
  });

  const ResetPassword = {
    schema: {
      body: authSchemas.resetPassword,
      response: {
        200: Type.Object({
          data: UserSchema,
        }),
      },
    },
  };
  server.post("/reset-password", ResetPassword, async (req, reply) => {
    const data = await server.mongo.db!;
    return reply.send({ data });
  });

  const VerifyEmail = {
    schema: {
      body: authSchemas.verifyEmail,
      response: {
        200: Type.Object({
          data: UserSchema,
        }),
      },
    },
  };
  server.post("/verify-email", VerifyEmail, async (req, reply) => {
    const data = await server.mongo.db!;
    return reply.send({ data });
  });
  done();
};
export default routes;
