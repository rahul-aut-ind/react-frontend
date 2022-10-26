const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Workouts Schema
const WorkoutSchema = new Schema({
    pName: String,
    desc: String,
    isAvailable: Boolean,
    image: String,
    category: String,
    startDate: Date,
});

// Export the Schema
module.exports  = mongoose.model("Workout", WorkoutSchema);