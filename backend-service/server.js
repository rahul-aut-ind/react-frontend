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

app.get("/workouts", (req, res) => {
    // get query params
    let {pageNo = 1, itemsToDisplay = 20, category = "", startDate = ""} = req.query;

    function isEmpty(value) {
        return value === undefined || value === null || value === "\"\"" || value === "\'\'" || value.length === 0;
    }

    try {
        if (pageNo < 1) {
            pageNo = 1;
        }
        const skip = (pageNo - 1) * itemsToDisplay;

        const defaultFilterCriteria = {$ne: null};
        let filterCriteria = {category: isEmpty(category) ? defaultFilterCriteria : {$eq: category}};

        if (isEmpty(startDate)) {
            filterCriteria = Object.assign(filterCriteria, {startDate: defaultFilterCriteria});
        } else {
            const dateObj = new Date(startDate);
            let ToDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1).toISOString();
            let FromDate = new Date(dateObj.getFullYear(), dateObj.getMonth()).toISOString();

            filterCriteria = Object.assign(filterCriteria, {startDate: {$gte: FromDate, $lte: ToDate}});
        }

        //count documents
        Workouts.count(filterCriteria, function (err, totalCount) {
            if (err) {
                return res.status(500).json({
                    errMsg: "Some Err getting response from Server.."
                })
            }
            if (totalCount === 0) {
                return res.json({
                    totalPages: 0,
                    currentPage: 0,
                    itemsOnPage: 0,
                    contents: [],
                })
            }
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
        })
    } catch (err) {
        return res.json({
            errMsg: err.toString(),
            totalPages: 0,
            currentPage: 0,
            itemsOnPage: 0,
            contents: [],
        });
    }
})