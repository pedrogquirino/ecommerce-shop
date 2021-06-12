import Sequelize from "sequelize";
import dbConfig from "../config/database";
import Order from "../models/order.model";
import Item from "../models/item.model";

const connection = new Sequelize(dbConfig);

Order.init(connection);
Item.init(connection);

Order.associate(connection.models);
Item.associate(connection.models);

module.exports = connection;
