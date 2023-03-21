const user = ["getPaths", "editPaths", "deletePaths"];
const admin = [
    "getUsers",
    "manageUsers",
    "adminGetPaths",
    "adminEditPaths",
    "adminDeletePaths",
];
const roleRights = Object.freeze({
    user,
    admin: [...user, ...admin],
});
const roles = Object.keys(roleRights);
export { roles, roleRights };
//# sourceMappingURL=roles.js.map