'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const existsTable = await queryInterface.tableExists('customers')

    if (!existsTable) {
      const { DataTypes } = Sequelize

      await queryInterface.createTable('customers', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      })
    }
  },

  async down (queryInterface) {
    const existsTable = await queryInterface.tableExists('customers')

    if (existsTable) {
      await queryInterface.dropTable('customers')
    }
  }
};
