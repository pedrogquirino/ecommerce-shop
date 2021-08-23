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
      const orderCreated = await Order.create(order, {
        include: [{ model: Item, as: "items" }],
      });

      const eventData = {
        id: orderCreated.id,
        createdAt: orderCreated.createdAt,
      };

      const message = {
        event: config.Kafka.EventTypes.OrderCreated,
        data: eventData,
      };

      await KafkaService.producer(config.Kafka.Topics.Orders, message);
      return res.send(orderCreated);
    } catch (error) {
      return res.json({ Error: `${error}` }).status(500);
    }
  },
};
