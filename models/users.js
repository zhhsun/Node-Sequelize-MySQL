'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }

  Users.init(
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
      name: {
        type: DataTypes.STRING,
        length: 255,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );

  return Users;
};
