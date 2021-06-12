const express = require("express");
const OrderController = require("./controllers/order.controller");

const routes = express.Router();

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);

module.exports = routes;
