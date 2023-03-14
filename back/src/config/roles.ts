const roleRights = new Map();
roleRights.set("user", []);
roleRights.set("admin", [
  "getUsers",
  "manageUsers",
  "adminGetPaths",
  "adminEditPaths",
  "adminDeletePaths",
]);

const roles = Object.keys(roleRights);

module.exports = {
  roles,
  roleRights,
};
