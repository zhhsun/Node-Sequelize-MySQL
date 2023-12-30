'use strict';

const _ = require('lodash');

module.exports = {
  nodeSerializer: (item) => {
    return _.omit(item, '_id');
  },
};
