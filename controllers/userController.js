'use strict';

const { v4: uuidV4, validate: isValidUUID } = require('uuid');
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const BaseController = require('./baseController');
const { userService } = require('../services')
const Exceptions = require('../exceptions');

module.exports = {
  /**
   * 
   */
  async create(req, res) {
    try {
      const { name, email } = req.body;

      if (typeof name !== 'string')
        throw new Exceptions.BadInputException('Order name must be a valid string');
      if (typeof email !== 'string')
        throw new Exceptions.BadInputException('Order code must be a valid string');

        const payload = {
          id: uuidV4(),
          name,
          email
        };
      
      const order = await userService.createUser(logger, payload);
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

      if (!Number.isInteger(offset)) throw new Exceptions.BadInputException('offset must be a integer');
      if (!Number.isInteger(limit)) throw new Exceptions.BadInputException('limit must be a integer');
      if (offset < 0) throw new Exceptions.BadInputException('offset must be a positive integer');
      if (limit < 0 || limit > 100) throw new Exceptions.BadInputException('limit must be in [0, 100]');

      const orders = await userService.listUsers(logger, offset, limit);
      res.status(200).send(orders);
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   * 
   */
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(logger, req.params.id);
      if (!user) throw new Exceptions.EntityNotFoundException(`User with id ${req.params.id} not found`);
      res.status(200).send(user);
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },
};
