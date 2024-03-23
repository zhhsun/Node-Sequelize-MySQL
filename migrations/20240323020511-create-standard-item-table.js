'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('standard_items', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      _id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      parent_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: true,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: true,
      },
      count: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      state: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      purchase_order_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      supplier_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      required_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      note: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      deleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },
      created_by: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },
      updated_by: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('standard_items');
  },
};
