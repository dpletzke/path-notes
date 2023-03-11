import { Static, Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
  _id: Type.String(),
  userId: Type.String(),
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
  profilePhoto: Type.String(),
  paths: Type.Array(Type.String()),
});

export type User = Static<typeof UserSchema>;
