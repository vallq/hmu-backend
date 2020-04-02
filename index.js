const express = require("express");
const app = require("./app");
const PORT = 3001;
require("./utils/db");

app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});
