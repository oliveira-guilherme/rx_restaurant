import { DataTypes } from 'sequelize';
import sequelize from '../sequelize'
import Order from './Order'

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING
}, {
  tableName: 'customers',
  timestamps: false,
})

Customer.hasMany(Order, { foreignKey: 'customerId', as: 'orders' })

export default Customer