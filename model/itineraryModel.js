const mongoose = require("mongoose");
const itinerarySchema = new mongoose.Schema({
  city_id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  rating: {
    type: String
  },
  duration: {
    type: String
  },
  price: {
    type: String
  },
  hashtags: {
    type: String
  }
});

//name of module is the singular version (itinerary) of the database name (itineraries)
module.exports = mongoose.model("itinerary", itinerarySchema);
