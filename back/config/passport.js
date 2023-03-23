const { Strategy, ExtractJwt } = require("passport-jwt");

const jwtOptions = {
  secretOrKey: "secret",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    console.log("fake user lookup");
    const user = await new Promise(() => {
      if (payload.sub === 1) {
        return Promise.resolve({ id: 1, name: "John Doe" });
      }
      return Promise.resolve(null);
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
