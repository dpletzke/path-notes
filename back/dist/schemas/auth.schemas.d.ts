declare const _default: {
    register: import("@sinclair/typebox").TObject<{
        email: import("@sinclair/typebox").TString<"email">;
        password: import("@sinclair/typebox").TString<string>;
        name: import("@sinclair/typebox").TString<string>;
    }>;
    login: import("@sinclair/typebox").TObject<{
        email: import("@sinclair/typebox").TString<"email">;
        password: import("@sinclair/typebox").TString<string>;
    }>;
    logout: import("@sinclair/typebox").TObject<{
        refreshToken: import("@sinclair/typebox").TString<string>;
    }>;
    refreshTokens: import("@sinclair/typebox").TObject<{
        refreshToken: import("@sinclair/typebox").TString<string>;
    }>;
    forgotPassword: import("@sinclair/typebox").TObject<{
        email: import("@sinclair/typebox").TString<"email">;
    }>;
    resetPassword: import("@sinclair/typebox").TObject<{
        token: import("@sinclair/typebox").TString<string>;
        password: import("@sinclair/typebox").TString<string>;
    }>;
    verifyEmail: import("@sinclair/typebox").TObject<{
        token: import("@sinclair/typebox").TString<string>;
    }>;
};
export default _default;
