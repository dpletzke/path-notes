//write standard fastify crud routes for users with auth
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Type } from "@sinclair/typebox";
import { authSchemas, UserSchema } from "../schemas";
export const routes = function (server, opts, done) {
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
    server.post("/", Login, (req, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = yield server.mongo.db;
        return reply.send({ data });
    }));
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
    server.post("/register", Register, (req, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = yield server.mongo.db;
        return reply.send({ data });
    }));
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
    server.post("/logout", Logout, (req, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = yield server.mongo.db;
        return reply.send({ data });
    }));
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
    server.post("/refresh-tokens", RefreshTokens, (req, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = yield server.mongo.db;
        return reply.send({ data });
    }));
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
    server.post("/forgot-password", ForgotPassword, (req, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = yield server.mongo.db;
        return reply.send({ data });
    }));
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
    server.post("/reset-password", ResetPassword, (req, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = yield server.mongo.db;
        return reply.send({ data });
    }));
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
    server.post("/verify-email", VerifyEmail, (req, reply) => __awaiter(this, void 0, void 0, function* () {
        const data = yield server.mongo.db;
        return reply.send({ data });
    }));
    done();
};
export default routes;
//# sourceMappingURL=auth.routes.js.map