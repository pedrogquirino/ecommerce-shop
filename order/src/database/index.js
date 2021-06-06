import Sequelize from "sequelize";
import dbConfig from "../config/database";
import Order from "../models/Order";
import Item from "../models/Item";

const connection = new Sequelize(dbConfig);

Order.init(connection);
Item.init(connection);

Order.associate(connection.models);
Item.associate(connection.models);

module.exports = connection;
