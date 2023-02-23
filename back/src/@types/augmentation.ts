// import * as fastify from "fastify";
import * as http from "http";
import type { Db, MongoClient, MongoClientOptions } from "mongodb";
import { ObjectId } from "@fastify/mongodb";
export interface FastifyMongoObject {
  /**
   * Mongo client instance
   */
  client: MongoClient;
  /**
   * DB instance
   */
  db?: Db;
  /**
   * Mongo ObjectId class
   */
  ObjectId: typeof ObjectId;
}

export interface FastifyMongoNestedObject {
  [name: string]: FastifyMongoObject;
}

declare module "fastify" {
  export interface FastifyInstance {
    mongo: FastifyMongoObject & FastifyMongoNestedObject;
  }
}
