'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate(models) {}
  }

  Classroom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      class_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Classroom',
    }
  );

  return Classroom;
};
