'use strict';

const { v4: uuidV4 } = require('uuid');
const _ = require('lodash');
const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const BaseController = require('./baseController');
const { productionTaskManagementDirectoryService } = require('../services');
const Exceptions = require('../exceptions');
const {
  nodeSerializer,
} = require('./serializers/productionTaskManagementDirNodeSerializer');

module.exports = {
  /**
   *
   */
  async create(req, res) {
    try {
      const { name, type, parentId } = req.body;

      if (typeof name !== 'string')
        throw new Exceptions.BadInputException(
          'Node name must be a valid string'
        );
      if (typeof type !== 'string')
        throw new Exceptions.BadInputException(
          'Node type must be a valid string'
        );

      const payload = {
        id: uuidV4(),
        ..._.pick(req.body, ['name', 'type']),
      };

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

      const node = await productionTaskManagementDirectoryService.createNode(
        logger,
        payload
      );
      node.parentId = parentId || null;
      
      res.status(201).send(nodeSerializer(node.toJSON()));
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
        await productionTaskManagementDirectoryService.getNodeById(
          logger,
          parentId
        );
      if (!parentNode || parentNode.deleted) {
        throw new Exceptions.BadInputException('Parent node do not exist');
      }

      const nodes = await productionTaskManagementDirectoryService.listSubNodes(
        logger,
        parentNode._id
      );
      res.status(200).send(nodes.map((node) => {
        node.parentId = parentId;
        return nodeSerializer(node);
      }));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   * 
   */
  async listAllNodes(req, res) {
    try {
      const nodes = await productionTaskManagementDirectoryService.listAllNodes(logger);
      const _idToNode = _.keyBy(nodes, '_id');
      res.status(200).send(nodes.map((node) => {
        node.parentId = _idToNode[node.parentId]?.id || null;
        return nodeSerializer(node);
      }));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },

  /**
   *
   */
  async deleteNodeById(req, res) {
    try {
      const node = await productionTaskManagementDirectoryService.getNodeById(
        logger,
        req.params.id
      );
      if (!node)
        throw new Exceptions.EntityNotFoundException(
          `Node with id ${req.params.id} not found`
        );
      await productionTaskManagementDirectoryService.deleteNodeById(
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
  async updateNodeById(req, res) {
    try {
      const node = await productionTaskManagementDirectoryService.getNodeById(
        logger,
        req.params.id
      );
      if (!node || node.deleted)
        throw new Exceptions.EntityNotFoundException(
          `Node with id ${req.params.id} not found`
        );

      const { name, type } = req.body;

      const newNode =
        await productionTaskManagementDirectoryService.updateNodeById(
          logger,
          node.id,
          { name, type }
        );
      const parentNode =
        await productionTaskManagementDirectoryService.getNodeByIntId(
          logger,
          newNode.parentId
        );
      if (!parentNode) newNode.parentId = null;
      else newNode.parentId = parentNode.id;

      res.status(200).send(nodeSerializer(newNode));
    } catch (err) {
      BaseController.parseException(res, err);
    }
  },
};
