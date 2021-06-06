const express = require("express");
const OrderController = require("./controllers/OrderController");
const ItemController = require("./controllers/ItemController");

const routes = express.Router();

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.post("/orders/{order_id}/items", ItemController.store);

module.exports = routes;
