const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.post("/signUp", (req, res) => {
  // Form validation
  console.log("i am in the sign up route"); // we will see it if we post in postman /signUp/signUp and will show up in terminal
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
            .save() // mongoose function taht allows us to take the new user and save it in the database
            .then(user => res.json(user)) // we are sending this message to the front end in a json format
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// access email and password from request body

module.exports = router;
