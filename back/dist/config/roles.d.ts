declare const roleRights: Readonly<{
    user: readonly ["getPaths", "editPaths", "deletePaths"];
    admin: readonly ["getPaths", "editPaths", "deletePaths", "getUsers", "manageUsers", "adminGetPaths", "adminEditPaths", "adminDeletePaths"];
}>;
declare const roles: readonly ("user" | "admin")[];
export { roles, roleRights };
