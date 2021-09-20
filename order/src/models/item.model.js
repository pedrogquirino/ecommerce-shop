const { Model, DataTypes } = require("sequelize");

class Item extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        quantity: DataTypes.DECIMAL,
        amount: DataTypes.DECIMAL,
        order_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Order",
            key: "id",
          },
          field: "order_id",
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
  }
}

module.exports = Item;
