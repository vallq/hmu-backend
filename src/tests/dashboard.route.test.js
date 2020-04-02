const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const dashboard = require("../routes/dashboard.route");
const Workout = require("../models/workout.model");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

describe("dashboard.route.js", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      await mongoose.connect(mongoUri);
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("GET /dashboard should return status 200 OK and all workouts posted", async () => {
    const mockWorkouts = [
      {
        name: "ben",
        exercises: "squats, jumping squats, lunges, v ups, climbers",
        duration: "15",
        date: "02/04/2020"
      },
      {
        name: "jane",
        exercises: "squats, jumping squats, lunges, v ups, climbers",
        duration: "15",
        date: "02/04/2020"
      }
    ];
    const origFunction = Workout.find;
    Workout.find = jest.fn();
    Workout.find.mockImplementationOnce(() => {
      return mockWorkouts;
    });
    const { body: workoutCollection } = await request(app)
      .get("/dashboard")
      .expect(200);
    expect(workoutCollection).toEqual(
      expect.arrayContaining([
        expect.objectContaining(mockWorkouts[0]),
        expect.objectContaining(mockWorkouts[1])
      ])
    );

    Workout.find = origFunction;
  });
});
