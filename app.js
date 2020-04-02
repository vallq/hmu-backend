const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: [process.env.FRONTEND_LOCALHOST, process.env.HIIT_BACKEND],
  credentials: true
};

app.use(cors(corsOptions));

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
