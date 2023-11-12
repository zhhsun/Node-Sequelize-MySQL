'use strict';

const express = require('express');
const router = express.Router();

const {
  userController,
  productionPlanningManagementController,
} = require('../controllers');

const v1ApiPrefix = '/v1/api';

/* GET home page. */
router.get(`/`, function (req, res, next) {
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

module.exports = router;
