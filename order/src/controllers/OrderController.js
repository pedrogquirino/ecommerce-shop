import Order from "../models/Order";
import Item from "../models/Item";

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
      return res.send(orderCreated);
    } catch {
      return res.send().status(500);
    }
  },
};
