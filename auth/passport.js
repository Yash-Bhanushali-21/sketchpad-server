const passport = require("passport");
const passportJWT = require("passport-jwt");
const fs = require("fs");
const privateKey = fs.readFileSync("private-key.pem");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const User = require("../models/user");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: privateKey,
    },
    (jwtPayload, done) => {
      return User.findOne({
        where: {
          id: jwtPayload.id,
        },
      })
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);
