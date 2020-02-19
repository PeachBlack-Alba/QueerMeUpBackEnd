const express = require("express");
const router = express.Router();
const itineraryModel = require("../model/itineraryModel");
router.get("/:city_id", (req, res) => {
  console.log(req.params);
  let itineraryRequested = req.params.city_id;
  itineraryModel
    .find({ city_id: itineraryRequested })
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => console.log(err));
});

module.exports = router;
