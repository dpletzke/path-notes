import { Type } from "@sinclair/typebox";
const password = Type.String({
    minLength: 8,
    pattern: "/d/",
});
const register = Type.Object({
    email: Type.String({ format: "email" }),
    password,
    name: Type.String({ required: true }),
});
const login = Type.Object({
    email: Type.String({ format: "email" }),
    password,
});
const logout = Type.Object({
    refreshToken: Type.String({ required: true }),
});
const refreshTokens = Type.Object({
    refreshToken: Type.String({ required: true }),
});
const forgotPassword = Type.Object({
    email: Type.String({ format: "email", required: true }),
});
const resetPassword = Type.Object({
    token: Type.String({ required: true }),
    password,
});
const verifyEmail = Type.Object({
    token: Type.String({ required: true }),
});
export default {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    verifyEmail,
};
//# sourceMappingURL=auth.schemas.js.map