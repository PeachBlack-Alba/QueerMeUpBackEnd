const express = require("express");
const router = express.Router();
const cityModel = require("../model/cityModel");
router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." });
});

router.get("/all", (req, res) => {
  cityModel
    .find({})
    .then(files => {
      console.log(files);
      res.send(files);
    })
    .catch(err => console.log(err));
});

module.exports = router;
