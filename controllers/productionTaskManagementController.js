'use strict';

const { v4: uuidV4 } = require('uuid');
const _ = require('lodash');
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const BaseController = require('./baseController');
const { productionTaskManagementService, productionTaskManagementDirectoryService } = require('../services');
const Exceptions = require('../exceptions');
const {
  itemSerializer,
} = require('./serializers/productionTaskManagementItemSerializer');

module.exports = {
  /**
   *
   */
  async create(req, res) {
    try {
      const { name, parentId } = req.body;

      if (!parentId) {
        throw new Exceptions.BadInputException('Parent id must be specified');
      }

      if (typeof name !== 'string')
        throw new Exceptions.BadInputException(
          'Node name must be a valid string'
        );

      if (parentId) {
        const parentNode =
          await productionTaskManagementDirectoryService.getNodeById(
            logger,
            parentId
          );
        if (!parentNode)
          throw new Exceptions.BadInputException('Parent node do not exist');
        payload.parentId = parentNode._id;
      }

      const payload = {
        id: uuidV4(),
        ..._.pick(req.body, [
          'parentId',
          'modelNumber',
          'modelName',
          'modelType',
          'productNumber',
          'productName',
          'planningNumber',
          'planningStartAt',
          'planningEndAt',
          'deliveryAt',
          'note',
        ]),
      };

      const task = await productionTaskManagementService.createTask(
        logger,
        payload
      );
      task.parentId = parentId || null;
      
      res.status(201).send(itemSerializer(node.toJSON()));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async list(req, res) {
    try {
      const { id: parentId } = req.params;

      if (typeof parentId !== 'string')
        throw new Exceptions.BadInputException('parent id must be specified');

      const parentNode =
        await productionTaskManagementDirectoryService.getTasksById(
          logger,
          parentId
        );
      if (!parentNode || parentNode.deleted) {
        throw new Exceptions.BadInputException('Parent node do not exist');
      }

      const tasks = await productionTaskManagementService.listTasks(
        logger,
        parentNode._id
      );
      res.status(200).send(tasks.map((task) => {
        task.parentId = parentId;
        return itemSerializer(task);
      }));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async deleteTaskById(req, res) {
    try {
      const node = await productionTaskManagementService.getTaskById(
        logger,
        req.params.id
      );
      if (!node)
        throw new Exceptions.EntityNotFoundException(
          `Node with id ${req.params.id} not found`
        );
      await productionTaskManagementService.deleteTaskById(
        logger,
        node.id
      );
      res.status(204).end();
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async updateTaskById(req, res) {
    try {
      const task = await productionTaskManagementService.getTaskById(
        logger,
        req.params.id
      );
      if (!task || task.deleted)
        throw new Exceptions.EntityNotFoundException(
          `Task with id ${req.params.id} not found`
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
        'note',
      ]);
      const newTask =
        await productionTaskManagementService.updateTaskById(
          logger,
          task.id,
          newData
        );
      
      newTask.parentId = parentNode.id;

      res.status(200).send(itemSerializer(newTask));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },
};
