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
import { utilSchemas, PathSchema } from "../schemas";
const GetAllPathsSchema = {
    response: {
        200: Type.Object({ data: Type.Array(PathSchema) }),
    },
};
export const routes = function (server, opts, done) {
    server.route({
        url: "/",
        method: ["GET"],
        schema: GetAllPathsSchema,
        onRequest: server.auth([]),
        handler: (_, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("paths")
                .find({})
                .toArray();
            return reply.send({ data });
        }),
    });
    const GetPathSchema = {
        response: {
            200: Type.Object({ data: PathSchema }),
        },
    };
    server.route({
        url: "/:id",
        method: ["GET"],
        schema: GetPathSchema,
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("paths")
                .findOne({ _id: req.params.id });
            return reply.send({ data });
        }),
    });
    const PostPathSchema = {
        body: Type.Omit(PathSchema, ["_id"]),
        response: {
            200: Type.Object({ data: PathSchema }),
        },
    };
    server.route({
        url: "/",
        method: ["POST"],
        schema: PostPathSchema,
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("paths")
                .insertOne(req.body);
            return reply.send({ data });
        }),
    });
    const EditPathSchema = {
        body: Type.Omit(PathSchema, ["_id"]),
        response: {
            200: Type.Object({ data: PathSchema }),
        },
    };
    server.route({
        url: "/:id",
        method: ["PUT"],
        schema: EditPathSchema,
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield server.mongo
                .db.collection("paths")
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
                .db.collection("paths")
                .deleteOne({ id: req.params.id });
            return reply.send({ data });
        }),
    });
    done();
};
export default fp(routes);
//# sourceMappingURL=path.routes.js.map