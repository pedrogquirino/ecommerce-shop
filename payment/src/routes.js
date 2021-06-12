const express = require("express");
const PaymentController = require("./controllers/payment.controller");

const routes = express.Router();

routes.post("/payments", PaymentController.store);

module.exports = routes;
