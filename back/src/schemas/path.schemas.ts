import { Static, Type } from "@sinclair/typebox";

export const PathSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  photos: Type.Array(Type.String()),
});

export type Path = Static<typeof PathSchema>;
