'use strict';

const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Users Router */
router.get('/api/users', userController.list);
router.get('/api/users/:id', userController.getUserById);
router.post('/api/users', userController.create);

module.exports = router;
