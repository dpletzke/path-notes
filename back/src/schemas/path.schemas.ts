import { Static, Type } from "@sinclair/typebox";

export const PathSchema = Type.Object({
  _id: Type.String(),
  userId: Type.String(),
  name: Type.String(),
  description: Type.String(),
  photos: Type.Array(Type.String()),
});

export type Path = Static<typeof PathSchema>;
