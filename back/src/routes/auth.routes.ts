//write standard fastify crud routes for users with auth

import { Type } from "@sinclair/typebox";
import { FastifyPluginCallback } from "fastify";
import { DeleteSchema, UserSchema } from "../schemas";

const LoginSchema = {
  body: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  response: {
    200: Type.Object({
      data: Type.Object({ token: Type.String(), user: UserSchema }),
    }),
  },
};
export const routes: FastifyPluginCallback = function (server, opts, done) {
  server.route({
    url: "/",
    method: ["POST"],
    schema: LoginSchema,
    handler: async (req, reply) => {
      const data = await server.mongo
        .db!
      return reply.send({ data });
    },
  });
};
export default routes;
