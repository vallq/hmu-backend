const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [],
  duration: { type: Number },
  date: { type: String },
  time: { type: String }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
