'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductionPlanningManagementItems extends Model {
    static associate(models) {}
  }

  ProductionPlanningManagementItems.init(
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
      modelNumber: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: true,
        field: 'model_number'
      },
      modelName: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: false,
        field: 'model_name'
      },
      modelType: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: false,
        field: 'model_type'
      },
      productName: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: false,
        field: 'product_name'
      },
      productNumber: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: false,
        field: 'product_number'
      },
      planningNumber: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: true,
        field: 'planning_number'
      },
      planningStartAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'planning_start_at'
      },
      planningEndAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'planning_end_at'
      },
      deliveryAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'delivery_at'
      },
      selfMakingProgress: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true,
        field: 'self_making_progress'
      },
      purchaseProgress: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true,
        field: 'purchase_progress'
      },
      nonSelfMakingProgress: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true,
        field: 'non_self_making_progress'
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
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'updated_at'
      },
    },
    {
      sequelize,
      modelName: 'ProductionPlanningManagementItems',
    }
  );

  return ProductionPlanningManagementItems;
};
