var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fp from "fastify-plugin";
import { Type } from "@sinclair/typebox";
import { UserSchema, utilSchemas } from "../schemas";
const GetAllUsersSchema = {
    response: {
        200: Type.Object({ data: Type.Array(UserSchema) }),
    },
};
export const routes = function (server, opts, done) {
    server.route({
        url: "/",
        method: ["GET"],
        schema: GetAllUsersSchema,
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("users")
                .find({})
                .toArray();
            return reply.send({ data });
        }),
    });
    const GetUserSchema = {
        response: {
            200: Type.Object({ data: UserSchema }),
        },
    };
    server.route({
        url: "/:id",
        method: ["GET"],
        schema: GetUserSchema,
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("users")
                .findOne({ _id: req.params.id });
            return reply.send({ data });
        }),
    });
    const PostUserSchema = {
        body: Type.Omit(UserSchema, ["_id", "pathIds", "profilePhoto"]),
        response: {
            200: Type.Object({ data: UserSchema }),
        },
    };
    server.route({
        url: "/",
        method: ["POST"],
        schema: PostUserSchema,
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("users")
                .insertOne(req.body);
            return reply.send({ data });
        }),
    });
    const EditUserSchema = {
        body: Type.Partial(Type.Pick(UserSchema, ["name", "email", "password", "profilePhoto"])),
        response: {
            200: Type.Object({ data: UserSchema }),
        },
    };
    server.route({
        url: "/:id",
        method: ["PUT"],
        schema: EditUserSchema,
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("users")
                .updateOne({ id: req.params.id }, { $set: req.body });
            return reply.send({ data });
        }),
    });
    server.route({
        url: "/:id",
        method: ["DELETE"],
        schema: utilSchemas.del,
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("users")
                .deleteOne({ id: req.params.id });
            return reply.send({ data });
        }),
    });
    done();
};
export default fp(routes);
//# sourceMappingURL=user.routes.js.map