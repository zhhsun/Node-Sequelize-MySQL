'use strict';

const { ProductionTaskManagementItems } = require('../models');

module.exports = {
  /**
   * create a task
   * @param {Object} logger
   * @param {Object} task
   */
  async createTask(logger, task) {
    try {
      return await ProductionTaskManagementItems.create({
        ...task,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Create production task management task error: ', error);
      throw error;
    }
  },

  /**
   * list tasks
   */
  async listTasks(logger, queryConditions, offset = 0, limit = 100) {
    try {
      return await ProductionTaskManagementItems.findAll({
        where: {
          deleted: false,
          ...queryConditions,
        },
        offset,
        limit,
        raw: true,
      });
    } catch (error) {
      logger.error('List production task management items error: ', error);
      throw error;
    }
  },

  /**
   * get task by id
   */
  async getTaskById(logger, taskId) {
    try {
      return await ProductionTaskManagementItems.findOne({
        where: {
          id: taskId,
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Get production task management item error: ', err);
      throw err;
    }
  },

  /**
   * delete task by id
   */
  async deleteTaskById(logger, taskId) {
    try {
      return await ProductionTaskManagementItems.update(
        {
          deleted: true,
        },
        {
          where: {
            id: taskId,
          },
        }
      );
    } catch (err) {
      logger.error('Delete production task management item error: ', err);
      throw err;
    }
  },

  /**
   * update item by id
   */
  async updateTaskById(logger, taskId, newData) {
    try {
      await ProductionTaskManagementItems.update(
        {
          ...newData,
        },
        {
          where: {
            id: taskId,
          },
        }
      );
      return await ProductionTaskManagementItems.findOne({
        where: {
          id: taskId,
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Update production task management item error: ', err);
      throw err;
    }
  },
};
