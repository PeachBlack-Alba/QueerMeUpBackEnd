const express = require("express");
const router = express.Router();
const itineraryModel = require("../model/itineraryModel");
router.get("/:city_id", (req, res) => {
  console.log(req.params);
  let itineraryRequested = req.params.city_id;
  itineraryModel
    .find({ city_id: itineraryRequested }) // this case find() in cities findeOne() because in here we want all the itineraries of each city
    .sort({ order: 1 }) // Ordenamos la data de forma ascendente según el parametro que hemos añadido en MongoDB "orden"
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => console.log(err));
});

module.exports = router;
