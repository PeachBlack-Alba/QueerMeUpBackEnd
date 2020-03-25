const express = require("express");
const router = express.Router();
const itineraryModel = require("../model/itineraryModel");

router.post("/addtoFavourite", (req, res) => {
  console.log("req.body", req.body);
  const { itiID, userID, activityname } = req.body;
  itineraryModel
    .findById(itiID)
    .then(itinerary => {
      //check how to update nested array
      itinerary.activities.forEach(activity => {
        if (activity.name === activityname) {
          if (!activity.favourites.includes(userID)) {
            activity.favourites.push(userID);
            console.log("activity", activity);
            itinerary.save().then(saveditinerary => {
              res.status(200).send(itinerary);
            });
          } else {
            res.send("You have liked this activity already");
          }
        }
      });
    })
    .catch(err => res.send(err));
});
module.exports = router;
