'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StandardItems extends Model {
    static associate(models) {}
  }

  StandardItems.init(
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
        field: 'parent_id'
      },
      name: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        length: 127,
        allowNull: true,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      purchaseOrderId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'purchase_order_id'
      },
      supplierId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'supplier_id'
      },
      requiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'required_at'
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
      tableName: 'standard_items',
    }
  );

  return StandardItems;
};
