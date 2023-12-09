'use strict';

const { v4: uuidV4 } = require('uuid');
const _ = require('lodash');
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const BaseController = require('./baseController');
const { productionPlanningManagementService } = require('../services');
const Exceptions = require('../exceptions');
const {
  itemSerializer,
} = require('./serializers/productionPlanningManagementItemSerializer');

module.exports = {
  /**
   *
   */
  async create(req, res) {
    try {
      const { modelName, modelType, productNumber } = req.body;

      if (typeof modelName !== 'string')
        throw new Exceptions.BadInputException(
          'Model name must be a valid string'
        );
      if (typeof modelType !== 'string')
        throw new Exceptions.BadInputException(
          'Model type must be a valid string'
        );
      if (typeof productNumber !== 'string')
        throw new Exceptions.BadInputException(
          'Product number must be a valid string'
        );

      const payload = {
        id: uuidV4(),
        ..._.pick(req.body, [
          'modelNumber',
          'modelName',
          'modelType',
          'productNumber',
          'productName',
          'planningNumber',
          'planningStartAt',
          'planningEndAt',
          'deliveryAt',
          'note'
        ]),
      };

      const item = await productionPlanningManagementService.createItem(
        logger,
        payload
      );
      res.status(201).send(item);
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

      if (!Number.isInteger(offset))
        throw new Exceptions.BadInputException('offset must be a integer');
      if (!Number.isInteger(limit))
        throw new Exceptions.BadInputException('limit must be a integer');
      if (offset < 0)
        throw new Exceptions.BadInputException(
          'offset must be a positive integer'
        );
      if (limit < 0 || limit > 100)
        throw new Exceptions.BadInputException('limit must be in [0, 100]');

      const modelName = req.query.modelName;
      const queryConditions = {};
      if (modelName) queryConditions.modelName = modelName;
      const items = await productionPlanningManagementService.listItems(
        logger,
        queryConditions,
        offset,
        limit
      );
      res.status(200).send(items.map(itemSerializer));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async getItemById(req, res) {
    try {
      const item = await productionPlanningManagementService.getItemById(
        logger,
        req.params.id
      );
      if (!item)
        throw new Exceptions.EntityNotFoundException(
          `Item with id ${req.params.id} not found`
        );
      res.status(200).send(itemSerializer(item));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async deleteItemById(req, res) {
    try {
      const item = await productionPlanningManagementService.getItemById(
        logger,
        req.params.id
      );
      if (!item)
        throw new Exceptions.EntityNotFoundException(
          `Item with id ${req.params.id} not found`
        );
      await productionPlanningManagementService.deleteItemById(item.id);
      res.status(204);
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async updateItemById(req, res) {
    try {
      const item = await productionPlanningManagementService.getItemById(
        logger,
        req.params.id
      );
      if (!item || item.deleted)
        throw new Exceptions.EntityNotFoundException(
          `Item with id ${req.params.id} not found`
        );

      const newData = _.pick(req.body, [
        'modelNumber',
        'modelName',
        'modelType',
        'productNumber',
        'productName',
        'planningNumber',
        'planningStartAt',
        'planningEndAt',
        'deliveryAt',
        'note'
      ]);

      const newItem = await productionPlanningManagementService.updateItemById(logger, item.id, newData);
      console.log(JSON.stringify(newItem, null, 2));
      res.status(200).send(itemSerializer(newItem));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },
};
