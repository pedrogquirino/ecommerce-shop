const express = require("express");
const routes = require("./routes");
const KafkaService = require("./services/kafka.service");
const config = require("./config");

const PORT = 3002;
const app = express();

app.use(express.json());
app.use(routes);

KafkaService.consumer(config.Kafka.GroupId, config.Kafka.Topics.Orders);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
