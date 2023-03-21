import { TLiteralValue, TSchema } from "@sinclair/typebox";
export declare const AsLiteralArray: <T extends TLiteralValue>(array: readonly T[]) => import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<T>[]>;
export declare const Nullable: <T extends TSchema>(type: T) => import("@sinclair/typebox").TUnion<[T, import("@sinclair/typebox").TNull]>;
