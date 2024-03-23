'use strict';

const express = require('express');
const router = express.Router();

const {
  userController,
  productionPlanningManagementController,
  productionTaskManagementDirectoryController,
  productionTaskManagementController,
  standardItemController,
} = require('../controllers');

const v1ApiPrefix = '/v1/api';

/* GET home page. */
router.get(`/`, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* Users Router */
router.get(`${v1ApiPrefix}/users`, userController.list);
router.get(`${v1ApiPrefix}/users/:id`, userController.getUserById);
router.post(`${v1ApiPrefix}/users`, userController.create);

/**/
router.post(
  `${v1ApiPrefix}/production-planning-management/items`,
  productionPlanningManagementController.create
);
router.get(
  `${v1ApiPrefix}/production-planning-management/items`,
  productionPlanningManagementController.list
);
router.get(
  `${v1ApiPrefix}/production-planning-management/items/:id`,
  productionPlanningManagementController.getItemById
);
router.delete(
  `${v1ApiPrefix}/production-planning-management/items/:id`,
  productionPlanningManagementController.deleteItemById
);
router.patch(
  `${v1ApiPrefix}/production-planning-management/items/:id`,
  productionPlanningManagementController.updateItemById
);

/**
 *
 */
router.post(
  `${v1ApiPrefix}/production-task-management/nodes`,
  productionTaskManagementDirectoryController.create
);
router.get(
  `${v1ApiPrefix}/production-task-management/nodes/:id/nodes`,
  productionTaskManagementDirectoryController.list
);
router.get(
  `${v1ApiPrefix}/production-task-management/nodes`,
  productionTaskManagementDirectoryController.listAllNodes
);
router.delete(
  `${v1ApiPrefix}/production-task-management/nodes/:id`,
  productionTaskManagementDirectoryController.deleteNodeById
);
router.patch(
  `${v1ApiPrefix}/production-task-management/nodes/:id`,
  productionTaskManagementDirectoryController.updateNodeById
);

/**
 *
 */
router.post(
  `${v1ApiPrefix}/production-task-management/tasks`,
  productionTaskManagementController.create
);
router.get(
  `${v1ApiPrefix}/production-task-management/nodes/:nodeId/tasks`,
  productionTaskManagementController.list
);
router.delete(
  `${v1ApiPrefix}/production-task-management/tasks/:id`,
  productionTaskManagementController.deleteTaskById
);
router.patch(
  `${v1ApiPrefix}/production-task-management/tasks/:id`,
  productionTaskManagementController.updateTaskById
);

/**
 *
 */
router.post(
  `${v1ApiPrefix}/production-task-management/standard-items`,
  standardItemController.create
);
router.get(
  `${v1ApiPrefix}/production-task-management/nodes/:nodeId/standard-items`,
  standardItemController.list
);
router.delete(
  `${v1ApiPrefix}/production-task-management/standard-items/:id`,
  standardItemController.deleteItemById
);
router.patch(
  `${v1ApiPrefix}/production-task-management/standard-items/:id`,
  standardItemController.updateItemById
);

module.exports = router;
