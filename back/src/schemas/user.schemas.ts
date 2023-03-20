import { Static, Type } from "@sinclair/typebox";
import { AsLiteralArray, Nullable } from "../helpers/schema.helpers";
import { roles } from "../config/roles";

export const UserSchema = Type.Object({
  _id: Type.String({ format: "uuid" }),
  role: AsLiteralArray(roles),
  name: Type.String({ maxLength: 50 }),
  email: Type.String({ format: "email", minLength: 6, maxLength: 50 }),
  password: Type.String({
    minLength: 6,
    maxLength: 50,
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})",
  }),
  profilePhoto: Nullable(Type.String({ format: "uri" })),
  pathIds: Type.Array(Type.String({ format: "uuid" })),
});

export type User = Static<typeof UserSchema>;
