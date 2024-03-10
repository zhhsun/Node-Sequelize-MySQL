'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('production_task_management_items', {
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
      model_number: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: true,
      },
      model_name: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: false,
      },
      model_type: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: false,
      },
      product_name: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: false,
      },
      product_number: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: true,
      },
      delivery_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      dir_id: {
        type: Sequelize.DataTypes.BIGINT,
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
    await queryInterface.dropTable('production_task_management_items');
  },
};
