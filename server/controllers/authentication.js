const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub means subject who this toke is issued to
  // iat: issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "you must provide an email and password" });
  }

  // if user with email exist
  User.findOne({
    email,
  })
    .then((existingUser) => {
      // if exist throw error
      if (existingUser) {
        return res.status(422).send({ error: "Email is already in use" });
      }
      // if user with email does'nt exist  create new user record
      const user = new User({
        email,
        password,
      });

      // save user to db
      user
        .save()
        .then((savedUser) => {
          // response that user was created
          res.json({ token: tokenForUser(savedUser) });
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      // if db query failed
      return next(err);
    });
};

exports.signIn = function (req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};
