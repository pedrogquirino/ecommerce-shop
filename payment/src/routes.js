const express = require("express");
const paymentController = require("./controllers/paymentController");

const routes = express.Router();

routes.post("/payments", paymentController.store);

module.exports = routes;
