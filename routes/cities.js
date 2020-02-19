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

//this is how you implement a city route by specific city
router.get("/:city_id", (req, res) => {
  console.log(req.params);
  let cityRequested = req.params.city_id;
  cityModel
    .findOne({ name: cityRequested })
    .then(city => {
      res.send(city);
    })
    .catch(err => console.log(err));
});

module.exports = router;
