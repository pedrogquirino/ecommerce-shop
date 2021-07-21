const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Order = require("../models/order.model");
const Item = require("../models/item.model");

const connection = new Sequelize(dbConfig);

Order.init(connection);
Item.init(connection);

Order.associate(connection.models);
Item.associate(connection.models);

module.exports = connection;
