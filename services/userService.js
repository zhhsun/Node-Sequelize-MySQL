'use strict';

const { Users } = require('../models')

module.exports = {
  /**
   * create a user
   * @param {Object} logger
   * @param {Object} order
   */
  async createUser(logger, order) {
    try {
      return await Users.create({ ...order, createdAt: new Date().toISOString() });
    } catch (error) {
      logger.error('Create user error: ', error);
      throw error;
    }
  },

  /**
   * list users
   */
  async listUsers(logger, offset = 0, limit = 100) {
    try {
      return await Users.findAll({
        where: {
          deleted: false
        },
        offset,
        limit
      });
    } catch (error) {
      logger.error('List Users error: ', error);
      throw error;
    }
  },

  /**
   * get user by id
   */
  async getUserById(logger, userId) {
    return await Users.findOne({
      where: {
        id: userId
      }
    })
  }
};