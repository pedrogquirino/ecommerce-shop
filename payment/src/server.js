const express = require("express");

const kafkaService = require("./services/kafkaService");
const eventHandler = require("./events/handler");
const routes = require("./routes");
const config = require("./config");

const PORT = 3002;
const app = express();

app.use(express.json());
app.use(routes);

const topics = [config.Kafka.Topics.Orders];
kafkaService.consumer(config.Kafka.GroupId, topics, eventHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
