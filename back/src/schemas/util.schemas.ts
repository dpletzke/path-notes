import { Type } from "@sinclair/typebox";

export const DeleteSchema = {
  response: {
    200: Type.Object({
      acknowledged: Type.Boolean(),
      deletedCount: Type.Number(),
    }),
  },
};
