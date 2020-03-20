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
router.post("/addToFavorite", (req, res) => {
  console.log("req.body", req.body);
  const { userID, itiID } = req.body;

  console.log("itiID :", itiID);
  itineraryModel
    .findById(itiID)
    .then(itinerary => {
      console.log(itinerary);
      if (
        !itinerary.favourites.includes(userID) ||
        itinerary.favourites.length === 0 ||
        itinerary.favourites === null
      ) {
        itinerary.favourites.push(userID);
        console.log("here");
        itinerary.save();
        console.log("saved");
        console.log(itinerary);
        res.status(200).send(itinerary);
      } else {
        res.send("You have liked this itinerary already");
      }
    })
    .catch(err => res.send(err));
});

module.exports = router;
