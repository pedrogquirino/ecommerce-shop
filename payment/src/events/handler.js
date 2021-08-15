const PaymentService = require("./services/paymentService");

const handler = (event, message) => {
  switch (event) {
    case config.Kafka.Topics.Orders:
      PaymentService.processOrder(message);
    default:
  }
};

module.exports = handler;
