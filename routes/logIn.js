const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const key = require("../keys");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var user = { name: username };
    const { email, password } = req.body;
    
if (!email.empty() || !password.empty()) {
        return res
            .status(400)
            .json({error: "Complete all the fields"});
    }

    userModel
        .findOne({ email })
        .then(user => {
            if (!user)
                return res.status(400).send('Email address does not exist')
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch)
                        return res.status(400).send('Invalid password')



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
