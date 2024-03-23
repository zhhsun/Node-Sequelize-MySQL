'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductionTaskManagementItems extends Model {
    static associate(models) {}
  }

  ProductionTaskManagementItems.init(
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
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'parent_id',
      },
      modelNumber: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: true,
        field: 'model_number',
      },
      modelName: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: false,
        field: 'model_name',
      },
      modelType: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: false,
        field: 'model_type',
      },
      status: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: true,
      },
      productName: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: false,
        field: 'product_name',
      },
      productNumber: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: false,
        field: 'product_number',
      },
      deliveryAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'delivery_at',
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'created_at',
      },
      createdBy: {
        type: DataTypes.STRING,
        field: 'created_by',
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'updated_at',
      },
      updatedBy: {
        type: DataTypes.STRING,
        field: 'updated_by',
      },
    },
    {
      sequelize,
      tableName: 'production_task_management_items',
    }
  );

  return ProductionTaskManagementItems;
};
