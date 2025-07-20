import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import Order from './Order'
import Menu from './Menu'

const OrderDish = sequelize.define('OrderDish', {
  orderId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  dishId:{
    type: DataTypes.UUID,
    primaryKey: true,
  },
  quantity: DataTypes.INTEGER,
}, {
  tableName: 'orders_dishes',
  timestamps: false,
})

OrderDish.belongsTo(Order, {
  as: 'Order',
  foreignKey: 'orderId',
})

OrderDish.belongsTo(Menu, {
  as: 'Dish',
  foreignKey: 'dishId',
})

export default OrderDish