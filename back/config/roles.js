const allRoles = {
  user: [
    "getOwnSelf",
    "editOwnSelf",
    "deleteOwnSelf",
    "getOwnPaths",
    "manageOwnPaths",
  ],
  admin: ["getUsers", "manageUsers", "getAllPaths", "manageAllPaths"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = { roles, roleRights };
