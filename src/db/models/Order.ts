import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import Menu from './Menu'

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  customerId: DataTypes.UUID,
  status: DataTypes.STRING
}, {
  tableName: 'orders',
  timestamps: false,
})

Order.belongsToMany(Menu, {
  as: 'dishes',
  through: {
    model: 'orders_dishes',
    unique: false
  },
  timestamps: false,
  foreignKey: 'orderId',
  otherKey: 'dishId',
})

export default Order