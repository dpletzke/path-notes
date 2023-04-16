const S = require("fluent-json-schema");

const pathSchema = S.object()
  .id("path")
  .prop("id", S.string().required())
  .prop("userId", S.string().required())
  .prop("name", S.string().required())
  .prop("description", S.string())
  .prop("photos", S.array().items(S.string()))
  .prop("coverPhoto", S.string())
  .prop("elevationGain", S.number())
  .prop("elevationLoss", S.number())
  .prop("elevationMin", S.number())
  .prop("elevationMax", S.number())
  .prop("distance", S.number())
  .prop("duration", S.number())
  .prop("difficulty", S.string())
  .prop("routeType", S.string());

const pathSchemaArray = S.array().items(pathSchema);

const pathPostSchema = pathSchema.without(["id", "userId"]);

const pathPutSchema = pathSchema.without(["id", "userId"]);

module.exports = {
  pathSchema,
  pathSchemaArray,
  pathPostSchema,
  pathPutSchema,
};
