'use strict';

const _ = require('lodash');

module.exports = {
  itemSerializer: (item) => {
    return _.omit(item, '_id');
  }
};