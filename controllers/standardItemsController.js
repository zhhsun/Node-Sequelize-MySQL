'use strict';

const { v4: uuidV4 } = require('uuid');
const _ = require('lodash');
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const BaseController = require('./baseController');
const { productionTaskManagementDirectoryService, standardItemService } = require('../services');
const Exceptions = require('../exceptions');
const {
  itemSerializer,
} = require('./serializers/standardItemSerilizer');

const itemStateDict = {
  PREPARING: 0,
  PURCHARSING: 1
};

module.exports = {
  /**
   *
   */
  async create(req, res) {
    try {
      const { parentId, count } = req.body;
      let { state = null } = req.body;

      if (!parentId) {
        throw new Exceptions.BadInputException('Parent id must be specified');
      }

      if (count && typeof count !== 'number') {
        throw new Exceptions.BadInputException('count must be integer');
      }

      if (state) {
        if (!['PREPARING', 'PURCHARSING'].includes(state))
          throw new Exceptions.BadInputException('state is not valid');
        else
          state = itemStateDict[state];
      }
      console.log('>>>>>>>>', state);

      let parentIntId = null;
      if (parentId) {
        const parentNode =
          await productionTaskManagementDirectoryService.getNodeById(
            logger,
            parentId
          );
        if (!parentNode)
          throw new Exceptions.BadInputException('Parent node do not exist');
        parentIntId = parentNode._id;
      }

      const payload = {
        id: uuidV4(),
        parentId: parentIntId,
        state,
        ..._.pick(req.body, [
          'name',
          'type',
          'count',
          'purchaseOrderId',
          'supplierId',
          'requiredAt',
          'note',
        ]),
      };

      const item = await standardItemService.createItem(
        logger,
        payload
      );
      item.parentId = parentId || null;
      
      res.status(201).send(itemSerializer(item.toJSON()));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async list(req, res) {
    try {
      const { nodeId: parentId } = req.params;

      if (typeof parentId !== 'string')
        throw new Exceptions.BadInputException('parent id must be specified');

      const parentNode =
        await productionTaskManagementDirectoryService.getNodeById(
          logger,
          parentId
        );
      if (!parentNode || parentNode.deleted) {
        throw new Exceptions.BadInputException('Parent node do not exist');
      }

      const items = await standardItemService.listItems(
        logger,
        {
          parentId: parentNode._id
        }
      );
      res.status(200).send(items.map((item) => {
        item.parentId = parentId;
        return itemSerializer(item);
      }));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async deleteItemById(req, res) {
    try {
      const item = await standardItemService.getItemById(
        logger,
        req.params.id
      );
      if (!item || item.deleted)
        throw new Exceptions.EntityNotFoundException(
          `Item with id ${req.params.id} not found`
        );
      await standardItemService.deleteItemById(
        logger,
        item.id
      );
      res.status(204).end();
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async updateItemById(req, res) {
    try {
      const { count } = req.body;
      let { state = null } = req.body;


      if (count && typeof count !== 'number') {
        throw new Exceptions.BadInputException('count must be integer');
      }

      if (state) {
        if ( !['PREPARING', 'PURCHARSING'].includes(state))
          throw new Exceptions.BadInputException('state is not valid');
        else
          state = itemStateDict[state];
      }

      const item = await standardItemService.getItemById(
        logger,
        req.params.id
      );
      if (!item || item.deleted)
        throw new Exceptions.EntityNotFoundException(
          `Item with id ${req.params.id} not found`
        );

      const newData = _.pick(req.body, [
        'name',
        'type',
        'count',
        'purchaseOrderId',
        'supplierId',
        'requiredAt',
        'note',
      ]);
      if (state) newData.state = state;

      const newItem =
        await standardItemService.updateItemById(
          logger,
          item.id,
          newData
        );
      
      newItem.parentId = newItem.id;

      res.status(200).send(itemSerializer(newItem));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },
};
