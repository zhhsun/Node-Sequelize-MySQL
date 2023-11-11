'use strict';

const { v4: uuidV4, validate: isValidUUID } = require('uuid');
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const BaseController = require('./baseController');
const { purchaseOrderService } = require('../services')
const Exceptions = require('../exceptions');

module.exports = {
  /**
   * 
   */
  async create(req, res) {
    try {
      const { name, code } = req.body;

      if (typeof name !== 'string')
        throw new Exceptions.BadInputException('Order name must be a valid string');
      if (typeof code !== 'string')
        throw new Exceptions.BadInputException('Order code must be a valid string');

        const payload = {
          id: uuidV4(),
          name,
          code
        };
      
      const order = await purchaseOrderService.createOrder(logger, payload);
      res.status(201).send(order);
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   * 
   */
  async list(req, res) {
    try {
      const { offset = 0, limit = 100 } = req.query;
      console.log(JSON.stringify(req, null, 2));

      if (!Number.isInteger(offset)) throw new Exceptions.BadInputException('offset must be a integer');
      if (!Number.isInteger(limit)) throw new Exceptions.BadInputException('limit must be a integer');
      if (offset < 0) throw new Exceptions.BadInputException('offset must be a positive integer');
      if (limit < 0 || limit > 100) throw new Exceptions.BadInputException('limit must be in [0, 100]');

      const orders = await purchaseOrderService.listOrders(logger, offset, limit);
      res.status(200).send(orders);
    } catch (error) {
      BaseController.parseException(res, err);
    }
  },

  async deleteOrder(req, res) {
    try {
      const { order_id: orderId } = req.params;
      if (!isValidUUID(orderId)) throw new Exceptions.BadRequestException('Order id must be a valid UUID');
      const order = await purchaseOrderService.getOrderById(logger, orderId);
      if (!order) throw new Exceptions.EntityNotFoundException(`Purchase order ${req} is not found.`);
      await purchaseOrderService.deleteOrder(logger, orderId);
      res.status(204).send({});
    } catch (error) {
      BaseController.parseException(res, err);
    }
  },

  async updateOrder(req, res) {
    try {
      const { order_id: orderId } = req.params;
      if (!isValidUUID(orderId)) throw new Exceptions.BadRequestException('Order id must be a valid UUID');
      const order = await purchaseOrderService.getOrderById(logger, orderId);
      if (!order) throw new Exceptions.EntityNotFoundException(`Purchase order ${req} is not found.`);

      const newOrder = await purchaseOrderService.updateOrder(logger, orderId, req.body);
      res.status(200).send(newOrder);
    } catch (error) {
      BaseController.parseException(res, err);
    }
  }
};
