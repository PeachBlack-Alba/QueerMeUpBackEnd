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

module.exports = mongoose.model("itineraries", itinerarySchema);
