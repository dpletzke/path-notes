const user = ["getPaths", "editPaths", "deletePaths"] as const;
const admin = [
  "getUsers",
  "manageUsers",
  "adminGetPaths",
  "adminEditPaths",
  "adminDeletePaths",
] as const;

const roleRights = Object.freeze({
  user,
  admin: [...user, ...admin] as const,
});

const roles = Object.keys(roleRights) as Readonly<
  Array<keyof typeof roleRights>
>;

export { roles, roleRights };
