const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Define our model

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true }, // one user per email
  password: String,
});

// on save hook, encrypt password
// before saving this model run this function
userSchema.pre("save", function (next) {
  // get access of user model( we get access of user.email,user.password)
  const user = this;

  // generate a salt takes time so we use a callback to run a function after salt is created
  bcrypt.genSalt(10, function (err, salt) {
    // encrypt our password using salt (salt + password= hashedPassword)
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);

      // overwrite plain text password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  // bcrypt will iternally take the candidate password and take the user password it will handle the comparison internally
  // and will call callback with isMatch that will be true or false if password is equal
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// export the model
module.exports = ModelClass;
