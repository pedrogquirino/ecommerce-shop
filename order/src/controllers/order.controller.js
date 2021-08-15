const Order = require("../models/order.model");
const Item = require("../models/item.model");
const KafkaService = require("../services/kafkaService");
const config = require("../config");

module.exports = {
  async index(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  },

  async store(req, res) {
    const order = req.body;
    try {
      const orderCreatedData = await Order.create(order, {
        include: [{ model: Item, as: "items" }],
      });

      const message = {
        Event: config.Kafka.EventTypes.OrderCreated,
        Data: orderCreatedData,
      };

      await KafkaService.producer(config.Kafka.Topics.Orders, message);
      return res.send(orderCreatedData);
    } catch (error) {
      return res.json({ Error: `${error}` }).status(500);
    }
  },
};
