import { Type } from "@sinclair/typebox";
import { Nullable } from "../helpers/schema.helpers";
export const PathSchema = Type.Object({
    _id: Type.String(),
    userId: Type.String({ format: "uuid" }),
    name: Type.String({ minLength: 1, maxLength: 50 }),
    description: Nullable(Type.String({ maxLength: 500 })),
    photos: Type.Array(Type.String({ format: "uri" })),
});
//# sourceMappingURL=path.schemas.js.map