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

//   userModel.findOne({ username: req.body.username }).then(user => {
//     console.log("user", user);
//     let FavItineraries = user.favourites.filter(
//       oneFavItin => oneFavItin.activitiesId === req.body.activitiesId
//     );

//     if (FavItineraries.length !== 0) {
//       console.log("currentFavItineraries", currentFavItineraries);
//       res.status(400).json({ error: "User already liked this itinerary!" });
//     } else {
//       itineraryModel
//         .findOne({ _id: req.body.activitiesId })
//         .then(itinerary => {
//           user.favourites.push({
//             activitiesID: req.body.activitiesId
//           });

//           user
//             .save()
//             .then(userFavItin => res.json(user.favourites))
//             .catch(err => {
//               res.status(500).json({ error: "There's an error" });
//             });
//         })
//         .catch(err => {
//           res.status(404).json({ error: "error" });
//         });
//     }
//   });
// });

module.exports = router;
