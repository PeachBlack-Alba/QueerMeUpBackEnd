const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const key = require("../keys");
const jwt = require("jsonwebtoken");
const { isEmpty } = require("express-validator");
router.post("/logIn", (req, res) => {
  var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
  //   var email = req.body.email;
  //   var username = req.body.username;
  //   var password = req.body.password;
  //   var user = { name: username };
  const { email, password } = req.body;
  console.log("i am in the log in route"); // we will see it if we post in postman /logIn/logIn and will show up in terminal
  console.log("email", email);
  if (!email || !password) {
    return res.status(400).json({ error: "Complete all the fields" });
  }
  userModel.findOne({ email }).then(user => {
    // if (user)
    //     return res.status(400).json({ email: "Email already exists" });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).send("Invalid password");

      const payload = {
        id: user.id,
        username: user.username,
        avatarPicture: user.picture
      };
      const options = { expiresIn: 2592000 };
      jwt.sign(payload, key.secretOrKey, options, (err, token) => {
        if (err) {
          res.json({
            success: false,
            token: "There was an error"
          });
        } else {
          res.json({
            success: true,
            token: token
          });
        }
      });
    });
  });
});
module.exports = router;
