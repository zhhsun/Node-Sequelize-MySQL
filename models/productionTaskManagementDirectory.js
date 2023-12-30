'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductionTaskManagementDirectory extends Model {
    static associate(models) {}
  }

  ProductionTaskManagementDirectory.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      parentId: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
        field: 'parent_id',
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
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        field: 'created_by',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'created_at',
      },
      updatedBy: {
        type: DataTypes.STRING,
        field: 'updated_by',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'ProductionTaskManagementDirectory',
    }
  );

  return ProductionTaskManagementDirectory;
};
