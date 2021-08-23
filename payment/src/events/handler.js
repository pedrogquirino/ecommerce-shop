const config = require("../config");
const paymentService = require("../services/paymentService");

const handler = (event, message) => {
  switch (event) {
    case config.Kafka.Topics.Orders:
      paymentService.processOrder(message);
    default:
  }
};

module.exports = handler;
