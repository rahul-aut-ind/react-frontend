const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Workouts = require("./models/Workouts");
const cors = require('cors');

// Setup express app
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cors())

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

    const defaultFilter = {$ne: null};
    // get query params
    let {pageNo = 1, itemsToDisplay = 20, category = defaultFilter, startDate = defaultFilter} = req.query;

    if (pageNo < 1) pageNo = 1;

    function isEmpty(value) {
        return value === undefined || value === null || value === "\"\"" || value === "\'\'" || value.length === 0;
    }

    category = isEmpty(category) ? defaultFilter : category;
    startDate = isEmpty(startDate) ? defaultFilter : startDate;
    const skip = (pageNo - 1) * itemsToDisplay;

    let ToDate = undefined;
    let FromDate = undefined;
    let totalCount = undefined;
    let filterCriteria;

    if (startDate != defaultFilter) {
        try {
            ToDate = new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth() + 1).toISOString();
            FromDate = new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth()).toISOString();

            filterCriteria = {category: category, startDate: {$gte: FromDate, $lte: ToDate}};
            //console.log("Date Filtered > " + filterCriteria);
        } catch (err) {
            return res.json({
                totalPages: 0,
                currentPage: 0,
                itemsOnPage: 0,
                contents: "No Document in Database matching criteria..",
            });
        }
    } else {
        filterCriteria = {category: category, startDate: defaultFilter};
        //console.log("All Dates > " + filterCriteria);
    }
    //count documents
    Workouts.count(filterCriteria, function (err, count) {
        if (err) {
            totalCount = 0;
        } else {
            totalCount = count;
            //console.log("Total Count > " + totalCount);
        }
        if (totalCount === 0) {
            return res.json({
                totalPages: 0,
                currentPage: 1,
                itemsOnPage: 0,
                contents: "No Document in Database matching criteria..",
            });
        } else {
            //get paginated documents
            Workouts.find(filterCriteria).sort({_id: -1})
                .skip(skip).limit(itemsToDisplay).then(function (contents) {

                return res.json({
                    totalPages: Math.ceil(totalCount / itemsToDisplay),
                    currentPage: pageNo,
                    itemsOnPage: contents.length,
                    contents: contents,
                })
            });
        }
    })
})