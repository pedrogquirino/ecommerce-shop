const Order = require("../models/Order");

module.exports = {
  async store(req, res) {
    const { order_id } = req.params;
    const { description, quantity, total_amount } = req.body;

    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    //const item = await Item.create({ description, quantity, total_amount });
    return res.json(order);
  },
};
