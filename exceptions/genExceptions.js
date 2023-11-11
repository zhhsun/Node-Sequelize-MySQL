'use strict';

const BaseException = require('./baseException');

class BadInputException extends BaseException {
  /**
   * 
   */
  constructor(message) {
    super('ERR_BAD_INPUT', message);
  }
}

class EntityNotFoundException extends BaseException {
  /**
   * 
   */
  constructor(message) {
    super('ERR_ENTITY_NOT_FOUND', message);
  }
}

module.exports = {
  BadInputException,
  EntityNotFoundException
};
