const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
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

  beforeEach(async () => {
    const date = new Date();
    const mockWorkout = {
      name: "ben",
      exercises: [
        "squats",
        "jumping squats",
        "lunges",
        "v ups",
        "climbers",
        "bridges"
      ],
      duration: "15",
      dateTimeObj: date.toString(),
      date: date.toDateString(),
      time: date.toLocaleTimeString()
    };

    await Workout.create(mockWorkout);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await Workout.deleteMany();
  });

  it("GET /dashboard should return status 200 OK and all workouts posted", async () => {
    const date = new Date();
    const mockWorkouts = [
      {
        name: "jerry",
        exercises: [
          "squats",
          "jumping squats",
          "lunges",
          "v ups",
          "climbers",
          "bridges"
        ],
        duration: 15,
        dateTimeObj: date.toString(),
        date: date.toDateString(),
        time: date.toLocaleTimeString()
      },
      {
        name: "jane",
        exercises: [
          "squats",
          "jumping squats",
          "lunges",
          "v ups",
          "climbers",
          "bridges"
        ],
        duration: 15,
        dateTimeObj: date.toString(),
        date: date.toDateString(),
        time: date.toLocaleTimeString()
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

  it("POST /dashboard should return status 201 and the newly created workout", async () => {
    const date = new Date();
    const mockWorkout = {
      name: "johan",
      exercises: [
        "climbers",
        "squats",
        "jumping squats",
        "v ups",
        "lunges",
        "bridges"
      ],
      duration: 15,
      dateTimeObj: date.toString(),
      date: date.toDateString(),
      time: date.toLocaleTimeString()
    };

    const { body } = await request(app)
      .post("/dashboard")
      .send(mockWorkout)
      .expect(201);
    expect(body).toMatchObject(mockWorkout);
  });
});
