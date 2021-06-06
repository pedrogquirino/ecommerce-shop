const express = require("express");
const routes = require("./routes");
require("./database");

const port = 3001;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
