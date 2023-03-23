const S = require("fluent-json-schema");

const userSchema = S.object()
  .id("user")
  .prop("id", S.string().required())
  .prop("role", S.string().required())
  .prop("name", S.string().required())
  .prop("email", S.string().required())
  .prop("password", S.string().required())
  .prop("createdAt", S.string().required())
  .prop("updatedAt", S.string().required());

const userSchemaArray = S.array().items(userSchema);

const userPostSchema = S.object()
  .id("userPost")
  .prop("role", S.string().required())
  .prop("name", S.string().required())
  .prop("email", S.string().required())
  .prop("password", S.string().required());

const userPutSchema = S.object()
  .id("userPut")
  .prop("role", S.string().required())
  .prop("name", S.string().required())
  .prop("email", S.string().required())
  .prop("password", S.string().required());

module.exports = {
  userSchema,
  userSchemaArray,
};
