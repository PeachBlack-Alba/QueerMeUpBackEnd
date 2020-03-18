const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  //name, img and more info and likes : {} ponerlo en itinerarios y también likes
});

module.exports = mongoose.model("activity", activitySchema);
