import { Type } from "@sinclair/typebox";
export const AsLiteralArray = (array) => {
    return Type.Union(array.map((item) => Type.Literal(item)));
};
export const Nullable = (type) => {
    return Type.Union([type, Type.Null()]);
};
//# sourceMappingURL=schema.helpers.js.map