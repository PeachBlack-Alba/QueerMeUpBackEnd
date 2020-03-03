const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const key = require("../keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//const { isEmpty } = require("express-validator"); // use !email or email.isEmpty()

router.post("/logIn", (req, res) => {
  const { email, password } = req.body;
  console.log("i am in the log in route"); // we will see it if we post in postman /logIn/logIn and will show up in terminal
  console.log("email", email);
  if (!email || !password) {
    return res.status(400).json({ error: "Complete all the fields" });
  }
  userModel.findOne({ email }).then(user => {
    // check if the user exist
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).send("Invalid password");

      const payload = {
        // if the user match, create the payload and generate a token
        id: user.id,
        username: user.username,
        avatarPicture: user.picture
      };
      const options = { expiresIn: 2592000 };
      jwt.sign(payload, key.secretOrKey, options, (err, token) => {
        if (err) {
          res.json({
            success: false,
            token: "There was an error" // send an error if there is
          });
        } else {
          res.json({
            // send the token if there is not a problem
            success: true,
            token: token
          });
        }
      });
    });
  });
});
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user._id })
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ error: "User does not exist!" }));
  }
);
module.exports = router;
