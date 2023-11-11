'use strict';

const { PurchaseOrders } = require('../models')

module.exports = {
  /**
   * create a new purchase order
   * @param {Object} logger
   * @param {Object} order
   */
  async createOrder(logger, order) {
    try {
      return await PurchaseOrders.create({ ...order, createdAt: new Date().toISOString() });
    } catch (error) {
      logger.error('Create purchase order error: ', error);
      throw error;
    }
  },

  /**
   * 
   */
  async listOrders(logger, offset = 0, limit = 100) {
    try {
      return await PurchaseOrders.findAll({
        where: {
          deleted: false
        },
        offset,
        limit
      });
    } catch (error) {
      logger.error('Create purchase order error: ', error);
      throw error;
    }
  },

  /**
   * 
   */
  async getOrderById(logger, orderId) {
    return await PurchaseOrders.findByPk({
      where: {
        id: orderId
      }
    })
  },

  /**
   * 
   */
  async deleteOrder(logger, orderId) {
    await PurchaseOrders.update({
      deleted: true,
    }, {
      where: {
        id: orderId
      }
    });
  },

  /**
   * 
   */
  async updateOrder(logger, orderId, newOrder) {
    await PurchaseOrders.update({
      ...newOrder
    }, {
      where: {
        id: orderId
      }
    });
  }
};