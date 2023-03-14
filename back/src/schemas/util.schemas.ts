import { Type } from "@sinclair/typebox";

const DeleteSchema = {
  response: {
    200: Type.Object({
      acknowledged: Type.Boolean(),
      deletedCount: Type.Number(),
    }),
  },
};

export default { DeleteSchema };
