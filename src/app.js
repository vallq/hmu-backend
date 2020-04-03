require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dashboardRouter = require("./routes/dashboard.route");

const corsOptions = {
  origin: ["http://localhost:3000",
  "http://localhost:3001"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.send({
    0: "GET /",
    1: "GET /dashboard",
    2: "POST /dashboard"
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  console.log(err);
  if (err.statusCode) {
    res.send({ error: err.message });
  } else {
    res.send({ error: "internal server error" });
  }
});

module.exports = app;
