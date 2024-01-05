'use strict';

const { ProductionTaskManagementDirectory } = require('../models');

module.exports = {
  /**
   * create a node
   * @param {Object} logger
   * @param {Object} node
   */
  async createNode(logger, node) {
    try {
      return await ProductionTaskManagementDirectory.create({
        ...node,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Create production task management node error: ', error);
      throw error;
    }
  },

  /**
   * list nodes
   */
  async listSubNodes(logger, parentId) {
    try {
      return await ProductionTaskManagementDirectory.findAll({
        where: {
          deleted: false,
          parentId,
        },
        raw: true,
      });
    } catch (error) {
      logger.error('List production task management node error: ', error);
      throw error;
    }
  },

  /**
   * list all nodes
   */
  async listAllNodes(logger, parentId) {
    try {
      return await ProductionTaskManagementDirectory.findAll({
        where: {
          deleted: false
        },
        raw: true,
      });
    } catch (error) {
      logger.error('List production task management all nodes error: ', error);
      throw error;
    }
  },

  /**
   * get node by id
   */
  async getNodeById(logger, nodeId) {
    try {
      return await ProductionTaskManagementDirectory.findOne({
        where: {
          id: nodeId,
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Get production task management node error: ', err);
      throw err;
    }
  },

  /**
   * get node by int id
   */
  async getNodeByIntId(logger, nodeId) {
    try {
      return await ProductionTaskManagementDirectory.findOne({
        where: {
          _id: nodeId,
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Get production task management node error: ', err);
      throw err;
    }
  },

  /**
   * delete node by id
   */
  async deleteNodeById(logger, nodeId) {
    try {
      return await ProductionTaskManagementDirectory.update(
        {
          deleted: true,
        },
        {
          where: {
            id: nodeId,
          },
        }
      );
    } catch (err) {
      logger.error('Delete production planning management item error: ', err);
      throw err;
    }
  },

  /**
   * update node name by id
   */
  async updateNodeNameById(logger, nodeId, name) {
    try {
      await ProductionTaskManagementDirectory.update(
        {
          name
        },
        {
          where: {
            id: nodeId,
          },
        }
      );
      return await ProductionTaskManagementDirectory.findOne({
        where: {
          id: nodeId,
        },
        raw: true,
      });
    } catch (err) {
      logger.error('Update production task management node error: ', err);
      throw err;
    }
  },
};
