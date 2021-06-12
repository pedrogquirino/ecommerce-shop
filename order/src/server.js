const express = require("express");
const routes = require("./routes");
require("./database");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
