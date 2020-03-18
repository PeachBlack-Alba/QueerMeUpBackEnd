// router.post("/addToFavorite", (req, res) => {
//     console.log("req.body", req.body);
//     const { userID, itiID } = req.body;

//     console.log("itiID :", itiID);
//     itineraryModel.findById(itiID).then(itinerary => {
//         if (!itinerary.favourite.includes(userID)) {
//             itinerary.favourites.push(userID);
//             itinerary.save();
//         }
//         res.send(itinerary);
//     });
// });
