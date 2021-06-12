import { Model, DataTypes } from "sequelize";

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        amount: {
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
