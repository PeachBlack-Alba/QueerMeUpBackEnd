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

//this is how you implement a city route by specific city
router.get("/:city_id", (req, res) => {
  let cityRequested = req.params.city_id;
  cityModel
    .findOne({ name: cityRequested })
    .then(city => {
      console.log(city_id);
      res.send(itineraries);
    })
    .catch(err => console.log(err));
});
