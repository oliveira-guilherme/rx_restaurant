import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import Order from './Order'

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    values: ['starter', 'main_course', 'dessert', 'drink'],
    allowNull: false,
  },
}, {
  tableName: 'menu',
  timestamps: false,
})

export default Menu