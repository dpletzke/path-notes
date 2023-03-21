import { Static } from "@sinclair/typebox";
export declare const PathSchema: import("@sinclair/typebox").TObject<{
    _id: import("@sinclair/typebox").TString<string>;
    userId: import("@sinclair/typebox").TString<"uuid">;
    name: import("@sinclair/typebox").TString<string>;
    description: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString<string>, import("@sinclair/typebox").TNull]>;
    photos: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString<"uri">>;
}>;
export type Path = Static<typeof PathSchema>;
