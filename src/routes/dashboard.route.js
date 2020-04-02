const express = require("express");
const router = express.Router();
const Workout = require("../models/workout.model");

router.get("/", async (req, res, next) => {
  const workoutCollection = await Workout.find();
  res.send(workoutCollection);
});

router.post("/", async (req, res, next) => {
  await Workout.init();
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  res.status(201).send(newWorkout);
})

router.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    err.statusCode = 400;
  }
  next(err);
});

module.exports = router;