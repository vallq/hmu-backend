const app = require("./app");
const PORT = 3001;
require("../utils/db");

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});
