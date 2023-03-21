import { Static } from "@sinclair/typebox";
export declare const UserSchema: import("@sinclair/typebox").TObject<{
    _id: import("@sinclair/typebox").TString<"uuid">;
    role: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"user" | "admin">[]>;
    name: import("@sinclair/typebox").TString<string>;
    email: import("@sinclair/typebox").TString<"email">;
    password: import("@sinclair/typebox").TString<string>;
    profilePhoto: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<"uri">, import("@sinclair/typebox").TNull]>;
    pathIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<"uuid">>;
}>;
export type User = Static<typeof UserSchema>;
