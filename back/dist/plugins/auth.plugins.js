var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FastifyPluginCallback } from "fastify/types/plugin";
import fp from "fastify-plugin";
import fastifyAuth from "@fastify/auth";
import fastifyJwt from "@fastify/jwt";
import { auth } from "../services";
import { FastifyReplyType, FastifyRequestType, } from "fastify/types/type-provider";
const env = require("dotenv").config().parsed;
const plugin = function (fastify, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify
            .register(fastifyJwt, {
            secret: "supersecret",
        })
            .decorate("authenticate", function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield request.jwtVerify();
                }
                catch (err) {
                    reply.send(err);
                }
            });
        });
        // fastify.decorate(
        //   "authenticate",
        //   async function (request, reply) {
        //     try {
        //       await request.jwtVerify();
        //     } catch (err) {
        //       reply.send(err);
        //     }
        //   }
        // );
    });
};
// const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
//   if (err || info || !user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//   }
//   req.user = user;
//   if (requiredRights.length) {
//     const userRights = roleRights.get(user.role);
//     const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
//     if (!hasRequiredRights && req.params.userId !== user.id) {
//       return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//     }
//   }
//   resolve();
// };
// const auth = (...requiredRights) => async (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));
// };
/**
 * make a auth plugin that provides various functions
 * one function should be a decorator that verifies there is a JWT token in the headers and that the token matches
 *  a user
 *  the user is then used to decorate the request object
 */
// const plugin: FastifyPluginCallback = async (server, opts, next) => {
//   server.register(fastifyAuth);
//   server.register(fastifyJwt, {
//     secret: env.JWT_SECRET,
//   });
//   server.decorate("auth", (requiredRights: string[]) => {
//     return async (request: FastifyRequestType, reply: FastifyReplyType, done:(void) => void) => {
//       const jwt = this.jwt;
//       const usersDb = this.mongo.db.collection("users")
//     };
// };
// interface IHeaders {
//   auth: string;
// }
// const plugin: FastifyPluginCallback = async (server, opts, next) => {
//   server.register(fastifyJwt, {
//     secret: env.JWT_SECRET,
//   });
//   server.decorate(
//     "verifyJWTandDB",
//     function (
//       request: FastifyRequestType<{ Headers: IHeaders }>,
//       reply: FastifyReplyType,
//       done
//     ) {
//       const jwt = this.jwt;
//       const usersDb = this.mongo.db.collection("users");
//       // if (request.body && request.body.failureWithReply) {
//       //   reply.code(401).send({ error: "Unauthorized" });
//       //   return done(new Error());
//       // }
//       if (!request.headers.auth) {
//         return done(new Error("Missing token header"));
//       }
//       jwt.verify(request.raw.headers.auth, function (err, decoded) {
//         if (err || !decoded.user || !decoded.password) {
//           return done(new Error("Token not valid"));
//         }
//         usersDb.findOne(decoded.user).then((user) => {
//           if (!user || user.password !== decoded.password) {
//             return done(new Error("Token not valid"));
//           }
//         });
//       });
//       done();
//     }
//   );
//   server.decorate("verifyUserAndPassword", auth.verifyUserAndPassword);
//   server.register(fastifyAuth);
//   next();
// };
export default fp(plugin);
//# sourceMappingURL=auth.plugins.js.map