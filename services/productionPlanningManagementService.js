'use strict';

const { ProductionPlanningManagementItems } = require('../models');

module.exports = {
  /**
   * create a item
   * @param {Object} logger
   * @param {Object} item
   */
  async createItem(logger, item) {
    try {
      return await ProductionPlanningManagementItems.create({
        ...item,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Create production planning management item error: ', error);
      throw error;
    }
  },

  /**
   * list items
   */
  async listItems(logger, queryConditions, offset = 0, limit = 100) {
    try {
      return await ProductionPlanningManagementItems.findAll({
        where: {
          deleted: false,
          ...queryConditions
        },
        offset,
        limit,
        raw: true,
      });
    } catch (error) {
      logger.error('List production planning management items error: ', error);
      throw error;
    }
  },

  /**
   * get item by id
   */
  async getItemById(logger, itemId) {
    try {
      return await ProductionPlanningManagementItems.findOne({
        where: {
          id: itemId,
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Get production planning management item error: ', err);
      throw err;
    }
  },

  /**
   * delete item by id
   */
  async deleteItemById(logger, itemId) {
    try {
      return await ProductionPlanningManagementItems.update(
        {
          deleted: true,
        },
        {
          where: {
            id: itemId,
          },
        }
      );
    } catch (err) {
      logger.error('Delete production planning management item error: ', err);
      throw err;
    }
  },

  /**
   * update item by id
   */
  async updateItemById(logger, itemId, newData) {
    try {
      await ProductionPlanningManagementItems.update(
        {
          ...newData
        },
        {
          where: {
            id: itemId,
          }
        }
      );
      return await ProductionPlanningManagementItems.findOne({
        where: {
          id: itemId,
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Update production planning management item error: ', err);
      throw err;
    }
  },
};
