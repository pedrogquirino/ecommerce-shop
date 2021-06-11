import Order from "../models/Order";
import Item from "../models/Item";
import { producer, TOPICS, EVENTS } from "../services/kafka.service";

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

      const event = {
        type: EVENTS.ORDER_CREATED,
        data: orderCreatedData,
      };

      await producer(TOPICS.ORDERS, event);
      return res.send(orderCreated);
    } catch {
      return res.send().status(500);
    }
  },
};
