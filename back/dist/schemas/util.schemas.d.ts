declare const _default: {
    del: {
        response: {
            200: import("@sinclair/typebox").TObject<{
                acknowledged: import("@sinclair/typebox").TBoolean;
                deletedCount: import("@sinclair/typebox").TNumber;
            }>;
        };
    };
};
export default _default;
