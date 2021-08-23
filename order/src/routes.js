const express = require("express");
const orderController = require("./controllers/orderController");

const routes = express.Router();

routes.post("/orders", orderController.store);
routes.get("/orders", orderController.index);

module.exports = routes;
