import { Type, TLiteralValue, TSchema } from "@sinclair/typebox";

export const AsLiteralArray = <T extends TLiteralValue>(
  array: readonly T[]
) => {
  return Type.Union(array.map((item) => Type.Literal(item)));
};

export const Nullable = <T extends TSchema>(type: T) => {
  return Type.Union([type, Type.Null()]);
};
