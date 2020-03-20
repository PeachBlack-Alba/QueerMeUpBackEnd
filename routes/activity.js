const express = require("express");
const router = express.Router();

router.post("/activity", (req, res) => {
  console.log("req.body", req.body);
  const { itiID, userID, activityname } = req.body;
  itineraryModel.then(itinerary => {
    itinerary.activities.forEach(activity => {
      if (activity.name === acitivityname) {
        if (!activity.users.includes(userID)) {
          activity.user.push(userID);
        }
      }
    });
    itinerary.save();
  });
});
module.exports = router;
