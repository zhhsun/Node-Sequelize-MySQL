'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('production_planning_management_item', {
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
      planning_number: {
        type: Sequelize.DataTypes.STRING,
        length: 127,
        allowNull: true,
      },
      planning_start_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      planning_end_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      delivery_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      self_making_progress: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      purchase_progress: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      non_self_making_progress: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
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
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('production_planning_management_items');
  },
};
