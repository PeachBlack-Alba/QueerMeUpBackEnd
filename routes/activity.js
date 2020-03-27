const express = require("express");
const router = express.Router();
const itineraryModel = require("../model/itineraryModel");

router.post("/addtoFavourite", (req, res) => {
  console.log("req.body", req.body);
  const { itiID, userID, activityname } = req.body;

  //in oder to update a nested array you need to use the findOneAndUpdate method from mongoDB as follow
  let update = { $push: { "activities.$[activity].favourites": userID } };

  let options = {
    useFindAndModify: false,
    upsert: true,
    arrayFilters: [{ "activity.name": activityname }]
  };
  itineraryModel.findOneAndUpdate(
    { _id: itiID },
    update,
    options,
    (err, itinerary) => {
      if (err) console.log("err", err);
      else {
        console.log(itinerary);

        res.status(200).send(itinerary);
      }
    }
  );

  // itineraryModel
  //   .findById(itiID)
  //   .then(itinerary => {
  //     //check how to update nested array

  //     itinerary.activities.forEach(activity => {

  //       if (activity.name === activityname) {
  //         if (!activity.favourites.includes(userID)) {
  //           activity.favourites.push(userID);
  //           console.log('itinerary', itinerary)
  //           itinerary.save(err => console.log('err :', err)).then(saveditinerary => {
  //             res.status(200).send(itinerary);
  //           });
  //         } else {
  //           res.send("You have liked this activity already");
  //         }
  //       }
  //     });
  //   })
  //   .catch(err => res.send(err));
});
module.exports = router;
