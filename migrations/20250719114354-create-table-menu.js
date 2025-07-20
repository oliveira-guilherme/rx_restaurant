'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const existsTable = await queryInterface.tableExists('menu')

    if (!existsTable) {
      const { DataTypes } = Sequelize

      await queryInterface.createTable('menu', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      })
    }
  },

  async down (queryInterface) {
    const existsTable = await queryInterface.tableExists('menu')
    const existsAuxTable = await queryInterface.tableExists('orders_dishes')

    if (existsTable) {
      if (existsAuxTable) {
        await queryInterface.dropTable('orders_dishes')
      }
      await queryInterface.dropTable('menu')
    }
  }
};
