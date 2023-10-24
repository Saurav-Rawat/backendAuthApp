const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");
const config = require("../config");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// create local strategy(by local we mean authenticate with local db creds)
// by default passport already handles password (so when we recieve a request with (email,password) passport will need to check if this password)
// is associated with any username i.e in our case we are specifying this username as email that we will recieve in request
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify the username and password, call done with user
  User.findOne({ email })
    .then((user) => {
      // if its correct username and password
      if (!user) return done(null, false);
      else {
        // check if current password is equal to encoded password we have in db
        user.comparePassword(password, function (err, isMatch) {
          if (err) return done(err);
          if (!isMatch) return done(null, false);
          return done(null, user);
        });
      }
    })
    .catch((err) => done(err));
  // otherwiser call done with false
});

// setup options for JWT Strategy
const jwtOptions = {
  // whenever we receive a req extract token from header key authorization
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// create JWT strategy
// payload is { sub: user.id, iat: timestamp } that we set while encoding jwt
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // see if user Id in the payload exist in DB
  // if it does, call 'done' with that user
  // if it does not call done with user as false
  User.findById(payload.sub)
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => {
      // some error occured while finding user
      return done(err, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
