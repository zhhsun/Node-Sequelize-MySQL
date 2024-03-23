'use strict';

const { StandardItems } = require('../models');

module.exports = {
  /**
   * create a item
   * @param {Object} logger
   * @param {Object} item
   */
  async createItem(logger, item) {
    try {
      return await StandardItems.create({
        ...item,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Create item error: ', error);
      throw error;
    }
  },

  /**
   * list items
   */
  async listItems(logger, queryConditions, offset = 0, limit = 100) {
    try {
      return await StandardItems.findAll({
        where: {
          deleted: false,
          ...queryConditions,
        },
        offset,
        limit,
        raw: true,
      });
    } catch (error) {
      logger.error('List items error: ', error);
      throw error;
    }
  },

  /**
   * get item by id
   */
  async getItemById(logger, id) {
    try {
      return await StandardItems.findOne({
        where: {
          id
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Get item error: ', err);
      throw err;
    }
  },


  /**
   * delete item by id
   */
  async deleteItemById(logger, id) {
    try {
      return await StandardItems.update(
        {
          deleted: true,
        },
        {
          where: {
            id
          },
        }
      );
    } catch (err) {
      logger.error('Delete item error: ', err);
      throw err;
    }
  },

  /**
   * update item by id
   */
  async updateItemById(logger, id, newData) {
    try {
      await StandardItems.update(
        {
          ...newData,
        },
        {
          where: {
            id,
          },
        }
      );
      return await StandardItems.findOne({
        where: {
          id,
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Update item error: ', err);
      throw err;
    }
  },
};
