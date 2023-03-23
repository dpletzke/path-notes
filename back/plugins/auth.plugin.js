const fp = require("fastify-plugin");
const fs = require("fs");
const path = require("path");
const passport = require("@fastify/passport");
const fastifySecureSession = require("@fastify/secure-session");
const { jwtStrategy } = require("../config/passport");
const { roleRights } = require("../config/roles");

const verifyCallback =
  (resolve, reject, requiredRights) =>
  async (request, reply, err, user, info, statuses) => {
    console.log("3");
    if (err || info || !user) {
      return reject(new Error("Please authenticate"));
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new Error("Forbidden"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (request, reply, next) => {
    console.log("1");
    return new Promise((resolve, reject) => {
      console.log("2");
      return passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(resolve, reject, requiredRights)
      );
    })
      .then(() => next())
      .catch((err) => {
        console.log("2.5:::::::", err);
        next(err);
      });
  };

const plugin = fp(async (fastify, opts) => {
  fastify.register(fastifySecureSession, {
    key: fs.readFileSync(path.join(__dirname, "secret-key")),
  });
  fastify.register(passport.initialize());
  fastify.register(passport.secureSession());

  passport.use("jwt", jwtStrategy);

  fastify.decorate("auth", auth);
});

module.exports = plugin;
