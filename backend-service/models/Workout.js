const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Workout Schema
const WorkoutSchema = new Schema({
  
  pName: {
    type: String
  },
  desc: {
    type: String
  },
  isAvailable: {
    type: Boolean
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  date: {
    type: String
  },
});

// Export the Schema
module.exports = Workout = mongoose.model("Workout", WorkoutSchema);
