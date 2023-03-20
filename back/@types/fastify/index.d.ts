import fastify from "fastify";
import { ServerResponse, IncomingMessage, Server } from "http";

declare module "fastify" {
  export interface FastifyRequestType {
    verifyJWT(): void;
  }
}
