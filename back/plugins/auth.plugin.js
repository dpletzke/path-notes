const fp = require("fastify-plugin");
const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status");
const passport = require("@fastify/passport");
const fastifySecureSession = require("@fastify/secure-session");
const { jwtStrategy } = require("../config/passport");
const { roleRights } = require("../config/roles");
const ApiError = require("../utils/ApiError");

const verifyCallback =
  (resolve, reject, requiredRights) =>
  async (request, reply, err, user, info, statuses) => {
    console.log("3", { request, reply, err, user, info, statuses });
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    request.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && request.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (request, reply, next) => {
    return new Promise((resolve, reject) => {
      return passport.authenticate(
        "jwt",
        { session: false, failWithError: true },
        verifyCallback(resolve, reject, requiredRights)
      )(request, reply, next);
    })
      .then(() => next())
      .catch((err) => {
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
