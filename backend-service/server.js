const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Workouts = require("./models/Workouts");
const Workout = require("./models/Workouts");

// Setup express app
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Configure Mongo
const db = "mongodb://localhost/workouts";

// Connect to Mongo with Mongoose
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => console.log("Mongo connected.."))
    .catch(err => console.log(err));

// Specify the Port where the backend server can be accessed and start listening on that port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}.`));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get("/workout/:id", (req, res) => {

    // Use Mongoose to get the Workout by the id
    Workouts.findById(req.params.id)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
});

app.get("/workouts/all", (req, res) => {

    // Use Mongoose to get all the workouts
    Workouts.find({})
        .then(function (dbWorkouts) {
            res.json(dbWorkouts);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
});

app.get("/workouts", (req, res) => {

    // get query params
    let {pageNo = 1, itemsToDisplay = 20} = req.query;

    if (pageNo < 1) pageNo = 1;

    const category = req.body.category;
    const date = req.body.startDate;

    const ToDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1).toISOString();
    const FromDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth()).toISOString();

    const skip = (pageNo - 1) * itemsToDisplay;
    let totalCount;

    // console.log({category: category, startDate: {$gte: FromDate, $lte: ToDate}});
    // console.log("skip", skip, "itemsToDisplay", itemsToDisplay);

    //count documents
    Workouts.count({category: category, date: {$gte: FromDate, $lte: ToDate}}, function (err, count) {
        if (err) {
            totalCount = 0;
        } else {
            totalCount = count;
            //console.log("Count > " + totalCount);
        }
        if (totalCount === 0) {
            return res.status(500).json({"msg": 'No Document in Database..'});
        }
    })

    //get paginated documents
    Workouts.find({category: category, date: {$gte: FromDate, $lte: ToDate}}).sort({_id: -1})
        .skip(skip).limit(itemsToDisplay).then(function (results) {
        //console.log("Results > " + results.length);
        return res.json({
            totalPages: Math.ceil(totalCount / itemsToDisplay),
            currentPage: pageNo,
            results: results,
        })
    });
})