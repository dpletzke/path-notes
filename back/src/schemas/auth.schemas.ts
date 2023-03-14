import S from "fluent-json-schema";

const password = S.string()
  .minLength(8)
  .pattern(/\d/)
  .pattern(/[a-zA-Z]/);

const register = S.object()
  .prop("email", S.string().format(S.FORMATS.EMAIL))
  .prop("password", password)
  .prop("name", S.string().required());
const login = S.object()
  .prop("email", S.string().format(S.FORMATS.EMAIL))
  .prop("password", password);

const logout = S.object().prop("refreshToken", S.string().required());

const refreshTokens = S.object().prop("refreshToken", S.string().required());

const forgotPassword = S.object().prop(
  "email",
  S.string().format(S.FORMATS.EMAIL).required()
);

const resetPassword = S.object()
  .prop("token", S.string().required())
  .prop("password", password);

const verifyEmail = S.object().prop("token", S.string().required());

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
