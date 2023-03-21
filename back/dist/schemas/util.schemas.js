import { Type } from "@sinclair/typebox";
const del = {
    response: {
        200: Type.Object({
            acknowledged: Type.Boolean(),
            deletedCount: Type.Number(),
        }),
    },
};
export default { del };
//# sourceMappingURL=util.schemas.js.map