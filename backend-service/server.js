const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Workout = require("./models/Workout");

// Setup express app
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

// Configure Mongo
const db = "mongodb://localhost/workouts";

// Connect to Mongo with Mongoose
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));

// Specify the Port where the backend server can be accessed and start listening on that port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}.`));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/workouts/all", (req, res) => {

    // Use Mongoose to get the Product by the id
    Workout.find({})
        .then(function(dbProduct) {
            res.json(dbProduct);
        })
        .catch(function(err) {
           console.log(err);
           res.json(err);
        });
});
