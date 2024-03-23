'use strict';

const _ = require('lodash');

const itemStateDict = {
  0: 'PREPARING',
  1: 'PURCHARSING'
};

module.exports = {
  itemSerializer: (item) => {
    item.state = itemStateDict[item.state] || null;
    return _.omit(item, '_id');
  },
};