const S = require("fluent-json-schema");
const deleteSchema = S.object().id("delete").prop("id", S.string().required());

module.exports = {
  deleteSchema,
};
