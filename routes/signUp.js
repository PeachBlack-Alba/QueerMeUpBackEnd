const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.post("/signUp", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } // now use const email in findOne method to check whether user already exists in our user collection (database)
  //first check whether user already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // if user already exits, send error message and error code
      return res.status(400).json({ email: "Email already exists" });
    } else {
      // only if user does not already exist, create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// access email and password from request body

// const email = req.body.email;
// const password = req.body.password;
// const userName = req.body.username;
// console.log(email);
