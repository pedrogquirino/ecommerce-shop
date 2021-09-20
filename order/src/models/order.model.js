const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        total_amount: {
          type: DataTypes.DECIMAL,
        },
        total_quantity: {
          type: DataTypes.DECIMAL,
        },
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Item, {
      foreignKey: "order_id",
      as: "items",
    });
  }
}

module.exports = Order;
