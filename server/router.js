const ModelClass = require("./models/user");
const Authentication = require("./controllers/authentication");
const passport = require("passport");
const passportService = require("./services/passport");

// middleware/interceptor
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, function (req, res) {
    res.send({
      hi: "there",
    });
  });
  app.post("/signIn", requireSignin, Authentication.signIn);

  app.post("/signUp", Authentication.signup);
};
