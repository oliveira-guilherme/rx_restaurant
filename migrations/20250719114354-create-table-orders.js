'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const existsTable = await queryInterface.tableExists('orders')

    if (!existsTable) {
      const { DataTypes } = Sequelize

      await queryInterface.createTable('orders', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        customerId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'customers',
            key: 'id',
          },
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      })
    }
  },

  async down (queryInterface) {
    const existsTable = await queryInterface.tableExists('orders')

    if (existsTable) {
      await queryInterface.dropTable('orders')
    }
  }
};
