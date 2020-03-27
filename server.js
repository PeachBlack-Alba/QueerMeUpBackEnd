const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./keys").mongoURI;
const mongoose = require("mongoose");
const passport = require("passport");
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err));
app.use(bodyParser.json()); // aplly midllewares before starting the server
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
//require("./model/userModel");
//passport middleware
app.use(passport.initialize());
require("./routes/passport");
app.use("/cities", require("./routes/cities"));
app.use("/itineraries", require("./routes/itineraries"));
app.use("/signUp", require("./routes/signUp")); // url will be sigUp/signUp beacuse in the route we said also Signup (router.post("/signUp", (req, res))
app.use("/logIn", require("./routes/logIn"));
app.use("/activity", require("./routes/activity"));

app.listen(port, () => {
  console.log("Server is running on " + port + "port!");
});
