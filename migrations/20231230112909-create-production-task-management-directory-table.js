'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('production_task_management_directory', {
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
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      deleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_by: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },
      updated_by: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('production_task_management_directory');
  },
};
